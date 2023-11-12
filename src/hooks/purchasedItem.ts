import { routes } from '@/consts/routes';
import { useAppSelector } from './redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { VideoLessonT } from './../types/videoLesson';
import { useParams, useSearchParams } from 'next/navigation';
import { PurchasedItemsT } from '@/types/purchasedItem';
import { TestT } from '@/types/test';
import { useState } from 'react';
import { getPurchasedItemById } from '@/firebase/db/purchasedItems/get/getPurchasedItemById';
import { CourseThemeT } from '@/types/courseThemes';

export const usePurchasedItem = () => {
    const itemId = useSearchParams().get('id');
    const userId = useAppSelector(state => state.user.id);
    const router = useRouter();
    const [loading,setLoading] = useState<{courseTheme:boolean}>({courseTheme:false});
    const [item,setItem] = useState<CourseThemeT>();

    const fetchItem = async () => {
        if(!itemId || !userId) return;
        setLoading(prev => ({...prev,item:true}));
        const res = await getPurchasedItemById(itemId,userId);
        if(!res){
            router.push(routes.home);
            setLoading(prev => ({...prev,item:false}));
            return;
        }
        setItem(res);
        setLoading(prev => ({...prev,item:false}));
    }

    useEffect(() => {
        fetchItem();
    },[itemId,userId]);

    return {loading,item};
}