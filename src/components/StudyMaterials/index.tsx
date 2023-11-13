import { routes } from "@/consts/routes";
import { useGetPaginatedStudyMaterials } from "@/hooks/getPaginatedStudyMaterials";
import { Button, Checkbox, Form, Input, Spin, TablePaginationConfig } from "antd";
import Link from "next/link";

export const StudyMaterialsComponent = () => {
    const {onSearch,loading,count,studyMaterials,onChangePagination,pagination} = useGetPaginatedStudyMaterials();

    const paginationConfig:TablePaginationConfig = {
        onChange: onChangePagination,
        total:count,
        defaultPageSize:5,
        current:pagination.page,
        onShowSizeChange: onChangePagination,
        showSizeChanger:true,
        pageSizeOptions:[5,10,20,50],
        showPrevNextJumpers:true
    }
    console.log(studyMaterials);
    
    return <div className="flex flex-col gap-10 p-10">
        <Form onFinish={onSearch}>
            <Form.Item label={'Назва'}  name={'name'}> 
                <Input placeholder="Назва"/>
            </Form.Item>
            <Form.Item label={'Теми'}  name={'themes'}> 
                <Input placeholder="Теми"/>
            </Form.Item>
            <Form.Item
                    label="Для вчителей?"
                    name="forTeacher"
                    valuePropName="checked"
                >
                <Checkbox defaultChecked={false}/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Пошук
                </Button>
            </Form.Item>
        </Form>
        <div className="flex flex-col gap-10">
            {!loading.items ? !!studyMaterials?.length ? studyMaterials?.map(studyMaterial => 
                <Link href={routes.studyMaterialItemPage(studyMaterial.id)} key={studyMaterial.id} className="flex w-full justify-between border-2 border-black border-solid items-center p-5"><p>{studyMaterial.name}</p><p>{studyMaterial.createdAt?.toDate().toLocaleString()}</p></Link>
            ) : <p>Нема посібників</p> : <Spin/>}
        </div>
    </div>
}