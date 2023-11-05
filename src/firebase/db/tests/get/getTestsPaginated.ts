import { VideoLessonT } from '../../../../types/videoLesson';
import { testsCollection, videoLessonsCollection } from '../../collectionsKeys';
import { collectionsKeys, courseThemesCollection } from '../../collectionsKeys';
import { query, startAt, limit, getDocs, orderBy, getCountFromServer, collection, where } from "firebase/firestore"
import { PaginationType } from '../../../../types/pagination';
import { db } from '../../../initializeFirebase';
import { getCourseById } from '../../courses/get/getCourseById';
import { CourseThemeT } from '../../../../types/courseThemes';
import { getCourseThemeById } from '../../courseThemes/get/getCourseThemeById';
import { TestT } from '../../../../types/test';

export const getTestsPaginated = async (paginationData:PaginationType,description?:string) => {
    const q = description ? query(testsCollection,orderBy('description','desc'),
                    where('description',">=",description || ''),   
                    where('description','<=',(description || '') + "\uf8ff"),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                    )
                   : query(testsCollection,orderBy('createdAt','desc'),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                   );
    
    const coll = collection(db, collectionsKeys.tests);
    const countSnapshot = await getCountFromServer(coll);
    const docs = await getDocs(q);  
    const tests = docs.docs.map(doc => doc.data());
    const themesQ = tests.map(async test => await getCourseThemeById(test.courseTheme));
    const themes = await Promise.all(themesQ);


    docs.docs.forEach((doc,i) => {
        tests[i].id = doc.id;
        tests[i].courseTheme = themes[i];
    });
    
    return {tests:tests as TestT[],count:countSnapshot.data().count};
}