import { routes } from '@/consts/routes';
import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { PaginationType } from '@/types/pagination';
import { StudyMaterialT } from '@/types/studyMaterial';
import { useState } from 'react';
import { getStudyMaterialsPaginated } from '@/firebase/db/studyMaterials/get/getStudyMaterialsPaginated';


export type SearchStudyMaterialsT = {
    name:string,
    themes:string,
    forTeacher:boolean,
}

export const useGetPaginatedStudyMaterials = (isFreeItems:boolean) => {
    const [studyMaterials,setStudyMaterials] = useState<StudyMaterialT[]>();
    const [count,setCount] = useState<number>();
    const [loading,setLoading] = useState<{items:boolean}>({items:false});
    const [pagination,setPagination] = useState<PaginationType>({page:1,pageSize:5});

    const fetch = async (data:SearchStudyMaterialsT) => {
        setLoading(prev => ({...prev,items:true}));
        const res = await getStudyMaterialsPaginated(pagination,data,isFreeItems);

        setStudyMaterials(res.items);
        setCount(res.count);

        setLoading(prev => ({...prev,items:false}));
    }

    const onSearch = (data:SearchStudyMaterialsT) => {
        fetch(data);
    }
    useEffect(() => {
        fetch({name:'',themes:'',forTeacher:false});
    },[])

    const onChangePagination = (page:number,pageSize:number) => {
        setPagination({page,pageSize});
    }
    return {onSearch,pagination,loading,count,studyMaterials,onChangePagination};
}