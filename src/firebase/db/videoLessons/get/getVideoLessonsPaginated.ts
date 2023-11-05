import { VideoLessonT } from './../../../../types/videoLesson';
import { videoLessonsCollection } from './../../collectionsKeys';
import { collectionsKeys, courseThemesCollection } from '../../collectionsKeys';
import { query, startAt, limit, getDocs, orderBy, getCountFromServer, collection, where } from "firebase/firestore"
import { PaginationType } from '../../../../types/pagination';
import { db } from '../../../initializeFirebase';
import { getCourseById } from '../../courses/get/getCourseById';
import { CourseThemeT } from '../../../../types/courseThemes';
import { getCourseThemeById } from '../../courseThemes/get/getCourseThemeById';

export const getVideoLessonsPaginated = async (paginationData:PaginationType,name?:string) => {
    const q = name ? query(videoLessonsCollection,orderBy('name','desc'),
                    where('name',">=",name || ''),
                    where('name','<=',(name || '') + "\uf8ff"),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                    )
                   : query(videoLessonsCollection,orderBy('createdAt','desc'),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                   );
    
    const coll = collection(db, collectionsKeys.videoLessons);
    const countSnapshot = await getCountFromServer(coll);
    const docs = await getDocs(q);
    const videoLessons = docs.docs.map(doc => doc.data());
    const themesQ = videoLessons.map(async videoLesson => await getCourseThemeById(videoLesson.courseTheme));
    const themes = await Promise.all(themesQ);
    
    docs.docs.forEach((doc,i) => {
        videoLessons[i].id = doc.id;
        videoLessons[i].courseTheme = themes[i];
    });
    
    return {videoLessons:videoLessons as VideoLessonT[],count:countSnapshot.data().count};
}