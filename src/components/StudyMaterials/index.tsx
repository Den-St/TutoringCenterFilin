import { routes } from "@/consts/routes";
import { SearchStudyMaterialsT, useGetPaginatedStudyMaterials } from "@/hooks/getPaginatedStudyMaterials";
import { useBuy } from "@/hooks/useBuy";
import { Button, Checkbox, Form, Input, Spin, TablePaginationConfig } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import Link from "next/link";
import { useEffect } from "react";
import { BuyStudyMaterialButton } from "../BuyStudyMaterial";
import { BuyProductButton } from "../BuyVideoCourseButton";

type Props = {
    isFreeItems:boolean
}

export const StudyMaterialsComponent:React.FC<Props> = ({isFreeItems}) => {
    const {onSearch,loading,count,studyMaterials,onChangePagination,pagination} = useGetPaginatedStudyMaterials(isFreeItems);
    const paginationConfig:TablePaginationConfig = {
        onChange: onChangePagination,
        total:count,
        defaultPageSize:30,
        current:pagination.page,
        // onShowSizeChange: onChangePagination,
        // showSizeChanger:true,
        // pageSizeOptions:[5,10,20,50],
        showPrevNextJumpers:true
    }
    console.log(studyMaterials);

    return <div className="flex flex-col gap-10 p-10">
        <Form onFinish={onSearch} style={{width:'400px'}} >
            <Form.Item label={'Назва'}  name={'name'} initialValue={''}> 
                <Input placeholder="Назва"/>
            </Form.Item>
            <Form.Item label={'Теми'}  name={'themes'} initialValue={''}> 
                <Input placeholder="Теми"/>
            </Form.Item>
            <Form.Item
                    label="Для вчителей?"
                    name="forTeacher"
                    initialValue={false}
                    valuePropName="checked"
                >
                <Checkbox/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button style={{'background':'blue'}} type="primary" htmlType="submit">
                    Пошук
                </Button>
            </Form.Item>
        </Form>
        <div className="flex flex-col gap-10">
            {!loading.items ? !!studyMaterials?.length ? studyMaterials?.map(studyMaterial => 
                <div key={studyMaterial.id}
                      className="flex w-full justify-between border-2 border-black border-solid items-center p-5">
                        <p>{studyMaterial.name}</p>
                        <BuyProductButton productType={'studyMaterial'} product={studyMaterial}/>
                </div>
            ) : <p>Нема посібників</p> : <Spin/>}
        </div>
    </div>
}