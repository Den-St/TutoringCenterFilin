import { ChangeTeacherInfoFormT, ChangeTeacherInfoT, TeacherInfoT, UserT ,} from "@/types/user"
import { Button, Form,Input, Select, Space } from "antd"
import {MinusCircleOutlined, PlusOutlined,UploadOutlined} from '@ant-design/icons';
import './styles.scss';
import { useEffect } from "react";
import Image from "next/image";
import { useSubjects } from "@/hooks/subjects";
const {Option} = Select;

type Props = {
    onChangeTeacherInfo:(data:ChangeTeacherInfoFormT) => void,
    isOnEditing:boolean,
    onEditingToggle:() => void,
    onChangeChosenSubjects:(stringified:string[]) => void
}

export const EditTeacherInfo:React.FC<Props> = ({isOnEditing,onChangeTeacherInfo,onEditingToggle,onChangeChosenSubjects}) => {
    const {loading,subjects} = useSubjects();
    const [form] = Form.useForm<ChangeTeacherInfoFormT>();
    const photo = Form.useWatch('photo', form);
    
    useEffect(() => {
        form.setFieldValue('photo',null);
    },[]);
    
    const onChangeImages = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        const newPhoto = e.target.files[e.target.files.length - 1];
        form.setFieldValue('photo',newPhoto);
    }
    
    return <div className={'flex flex-col gap-5 w-full'}>
        <Button className="w-40" onClick={onEditingToggle}>{isOnEditing ? 'Відмінити змінення' : 'Змінити інформацію'}</Button>
        {isOnEditing && 
            <Form form={form} onFinish={onChangeTeacherInfo} style={{width:'50%'}}>
                <Form.Item
                    style={{display:'none'}}
                    name="photo"
                >
                </Form.Item>
                {photo?.name && <img src={URL.createObjectURL(photo)}/>}
                <div className="photosInputContainer">
                    <UploadOutlined/>
                    <input className="photosInput" type={'file'} onChange={onChangeImages} accept="image/png, image/jpeg" multiple={true}/>
                </div> 
                <Select
                    // value={question.hashTags?.filter(hashTag => hashTag.length)}
                    style={{width:'150px'}}
                    onChange={onChangeChosenSubjects}
                    mode="multiple"
                    className="select"
                    loading={loading.subjects}
                    >
                    {subjects && subjects.map(subject => 
                        <Option key={subject.id} value={JSON.stringify(subject)}  >
                            {subject.name}
                        </Option>
                    )}
                    </Select>
                <Form.Item
                label={"Про себе"}
                name={'aboutMe'}>
                    <Input.TextArea autoSize={true}/>
                </Form.Item>
                <Form.Item
                label={"Учбова степінь"}
                name={'level'}>
                    <Input.TextArea autoSize={true}/>
                </Form.Item>
                <Form.List name="contacts">
                {(fields, { add, remove }) => (
                <>
                 
                {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', flexDirection:'column',gap:'3px'}} >
                    <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        rules={[{ required: true, message: 'Уведіть назву соц.мережи'}]}
                    >
                        <Input placeholder="Назва соц.мережи" />
                    </Form.Item>
                    <Form.Item
                        {...restField}
                        name={[name, 'contactURL']}
                        rules={[{ required: true, message: 'Уведіть посилання на соц.мережу' }]}
                    >
                        <Input placeholder="Посилання на соц.мережу" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                ))}
                <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Додати соц. мережу
                    </Button>
                </Form.Item>
                </>
                )}
                </Form.List>
                <Form.Item>
                    <Button style={{background:'blue !important'}} type="primary" htmlType="submit">
                        Змінити
                    </Button>
                </Form.Item>
            </Form>
        }
    </div>
}