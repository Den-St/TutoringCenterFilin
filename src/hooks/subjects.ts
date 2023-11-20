import { useEffect } from 'react';
import { getSubjects } from '@/firebase/db/subjects/get/getSubjects';
import { SubjectT } from '@/types/subject';
import { useState } from 'react';

export const useSubjects = () => {
    const [subjects,setSubjects] = useState<SubjectT[]>([])
    const [loading,setLoading] = useState<{subjects:boolean}>({subjects:false});

    const fetch = async () => {
        setLoading(prev => ({...prev,subjects:true}));
        const res = await getSubjects();
        setSubjects(res);
        setLoading(prev => ({...prev,subjects:false}));
    }

    useEffect(() => {
        fetch();
    },[])

    return {loading,subjects};
}