import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useAppSelector } from './redux';
import { createTeacherReview } from '@/firebase/db/teacherReview/create/createTeacherReview';
export const useCreateReview = () => {
    const [loading,setLoading] = useState<{create:boolean}>({create:false});
    const user = useAppSelector(state => state.user);
    const teacherId = useParams().slug;

    const onCreateReview = async (data:{text:string}) => {   
        setLoading(prev => ({...prev,create:true}));
        await createTeacherReview({text:data.text,authorName:user.name + ' ' + user.surname + ' ' + user.patronymic,teacher:teacherId as string});
        setLoading(prev => ({...prev,create:false}));
    }

    return {onCreateReview,loading}
}