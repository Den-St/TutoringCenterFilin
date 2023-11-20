import { SubjectT } from './../types/subject';
import { useEffect } from 'react';
import { ClassT } from '@/types/class';
import { CourseT } from '@/types/course';
import { TestProductT } from '@/types/testProduct';
import { useState } from 'react';
import { getPaginatedFreeTests } from '@/firebase/db/tests/get/getTestsPaginated';
import { PaginationType } from '@/types/pagination';

export const useSearchPaginatedFreeTests = () => {
    const [items,setItems] = useState<TestProductT[]>([]);
    const [loading,setLoading] = useState<{items:boolean}>({items:false})
    const [chosenSubject,setChosenSubject] = useState<SubjectT | null>(null);
    const [chosenClass,setChosenClass] = useState<ClassT | null>(null);
    const [pagination,setPagination] = useState<PaginationType>({page:1,pageSize:5});
    const [count,setCount] = useState<number | null>();

    const onChangeSubject = (stringified:string) => {
        setChosenSubject(JSON.parse(stringified) as SubjectT);
    }
    const onChangeClass = (stringified:string) => {
        setChosenClass(JSON.parse(stringified) as ClassT);
    }
    const fetch = async () => {
        setLoading(prev => ({...prev,items:true}));
        const res = await getPaginatedFreeTests(pagination,{class:chosenClass?.id,subject:chosenSubject?.id});
        setItems(res.tests);
        setCount(res.count);
        setLoading(prev => ({...prev,items:false}));
    }

    useEffect(() => {
        fetch();
    },[chosenClass,chosenSubject]);

    const onChangePagination = (page:number,pageSize:number) => {
        setPagination({page,pageSize});
    }

    return {onChangeClass,onChangeSubject,chosenClass,chosenSubject,items,count,onChangePagination,loading}
}