import { routes } from "@/consts/routes";
import { useSearchClass } from "@/hooks/searchClassNumber";
import { useSearchPaginatedFreeTests } from "@/hooks/searchPaginatedFreeTests";
import { useSearchSubject } from "@/hooks/searchSubject";
import { Form, Select } from "antd";
import Link from "next/link";
const {Option} = Select;

export const FreeTestsComponent = () => {
    const {chosenClass,chosenSubject,count,onChangeClass,onChangeSubject,onChangePagination,items} = useSearchPaginatedFreeTests();
    const {classesItems,classSearchLoading} = useSearchClass();
    const {subjectsItems,subjectSearchLoading} = useSearchSubject();
    
    return <div>
        <Form
            style={{width:'300px'}}
            >
            <Form.Item
                label="Номер класу"
                name="class"
                rules={[{ required: true, message: 'Оберіть клас!' }]}
                >
                <Select 
                    showSearch={true}
                    loading={classSearchLoading}
                    value={chosenClass ? JSON.stringify(chosenClass) : ''}
                    onChange={onChangeClass}
                    >
                        {classesItems?.length && classesItems.map(classItem => 
                            <Option key={classItem.id} value={JSON.stringify(classItem)}>
                                {classItem.number}
                            </Option>
                        )}
                </Select>  
            </Form.Item>
            <Form.Item
                label="Предмет"
                name="subject"
                rules={[{ required: true, message: 'Оберіть предмет!'}]}
                >
                <Select 
                    showSearch={true}
                    loading={subjectSearchLoading}
                    value={chosenSubject ? JSON.stringify(chosenSubject) : ''}
                    onChange={onChangeSubject}
                    >
                        {subjectsItems?.length && subjectsItems.map(subject => 
                            <Option key={subject.id} value={JSON.stringify(subject)}>
                                {subject.name}
                            </Option>
                        )}
                </Select>  
            </Form.Item>
        </Form>
        <div className="flex flex-col gap-5">
            {items.map(item => 
            <div className="p-10 border-black border-2" key={item.id}>
                <Link href={routes.freeTestItem(item.id)}>
                    {item.name}
                </Link>
            </div>)}
        </div>
    </div>
}