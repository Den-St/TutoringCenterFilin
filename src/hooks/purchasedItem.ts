import { useRouter } from 'next/router';
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
    const [loading,setLoading] = useState<{courseTheme:boolean,videos:boolean,tests:boolean,}>({courseTheme:false,videos:false,tests:false,});
    const [item,setItem] = useState<{
        courseTheme:CourseThemeT,
        videos:VideoLessonT[],
        tests:TestT[]
    }>();

    const fetchItem = async () => {
        if(!itemId) return;
        setLoading(prev => ({...prev,item:true}));
        const res = await getPurchasedItemById(itemId);
        if(!res){
            setLoading(prev => ({...prev,item:false}));
            return;
        }
        setItem(res);
        setLoading(prev => ({...prev,item:false}));
    }

    useEffect(() => {
        fetchItem();
    },[itemId]);
    console.log(item);
    return {loading,item};
}