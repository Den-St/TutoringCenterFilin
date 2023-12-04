import { useEffect } from 'react';
import { LessonT } from '../types/lessons';
import { getLessonsByUserId } from '@/firebase/db/lessons/get/getLessonOrdersByUserId';
import { useAppSelector } from '@/hooks/redux';
import { useState } from 'react';

export const useLessonOrders = () => {
    const [loading,setLoading] = useState(false);
    const [items,setItems] = useState<LessonT[]>([])
    const userId = useAppSelector(state => state.user.id);

    const fetch = async () => {
        setLoading(true);
        const res = await getLessonsByUserId(userId);
        setItems(res);
        setLoading(false);
    }

    useEffect(() => {
        fetch();
    },[]);
    
    return {loading,items};
}