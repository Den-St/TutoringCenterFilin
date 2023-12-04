import { createLessonOrder } from '../firebase/db/lessons/create/createLessonOrder';
import { getIsAlreadyOrdered } from '../firebase/db/lessons/get/getIsAlreadyOrdered';
import { useAppSelector } from "./redux";
import { useEffect, useState } from "react";
import { routes } from "@/consts/routes";
import { useRouter } from 'next/navigation';
import { LessonStatuses } from '@/types/lessons';

export const useOrderLesson = (teacherId:string) => {
    const userId = useAppSelector(state => state.user.id);
    const router = useRouter();

    const [loading,setLoading] = useState(false);
    const [isAlreadyOrdered,setIsAlredyOrdered] = useState(false);

    const fetchIsAlreadyOrdered = async () => {
        if(!userId) return;
        setLoading(true);
        const res = await getIsAlreadyOrdered(userId,teacherId);
        setIsAlredyOrdered(res);
        setLoading(false);
    }

    useEffect(() => {
        fetchIsAlreadyOrdered();
    },[userId,]);

    const onOrder = async () => {
        if(!userId ) return;
        setLoading(true);
        await createLessonOrder({user:userId,teacher:teacherId,createdAt:new Date(),status:LessonStatuses.notConfirmed,theme:'',link:'',date:null});
        setIsAlredyOrdered(true);
        setLoading(false);
        router.push(routes.afterLessonOrder);
    }

    return {onOrder,loading,isAlreadyOrdered,userId};
}