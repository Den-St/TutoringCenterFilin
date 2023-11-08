import { getCourseThemeById } from './../../courseThemes/get/getCourseThemeById';
import { collectionsKeys } from '../../collectionsKeys';
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../../initializeFirebase';
import { getVideoLessonsByCourseThemeId } from '../../videoLessons/get/getVideoLessonsByCourseId';
import { getTestsByCourseThemeId } from '../../tests/get/getTestsByCourseThemeId';
import { CourseThemeT } from '@/types/courseThemes';
import { TestT } from '@/types/test';
import { VideoLessonT } from '@/types/videoLesson';

export const getPurchasedItemById = async (id:string,userId:string) => {
    try{
        const document = doc(db,collectionsKeys.purchasedItems,id);
        const item = (await getDoc(document)).data();
        if(item?.user !== userId) return; 
        if(!item) return;

        const [courseTheme,videos,tests] = await Promise.all([
            await getCourseThemeById(item.product),
            await getVideoLessonsByCourseThemeId(item.product),
            await getTestsByCourseThemeId(item.product)
        ]);

        return {courseTheme:courseTheme as CourseThemeT,videos:videos as VideoLessonT[],tests:tests as TestT[]};
    }catch(err){
        console.error(err);
    }
}