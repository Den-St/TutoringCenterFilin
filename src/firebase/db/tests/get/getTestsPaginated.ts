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
import { TestProductT } from '@/types/testProduct';

export const getPaginatedFreeTests = async (paginationData:PaginationType,searchData:{class?:string,subject?:string}) => {
    const q = searchData.subject ? 
                    searchData.class ? query(testsCollection,orderBy('createdAt','desc'),
                    where('subject',"==",searchData.subject),
                    where('class','==',searchData.class),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                    )
                   : query(testsCollection,orderBy('createdAt','desc'),
                    where('subject',"==",searchData.subject),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                   ) : searchData.class ? query(testsCollection,orderBy('createdAt','desc'),
                   where('class','==',searchData.class),
                   // startAt(paginationData.page - 1 * paginationData.pageSize),
                   // limit(paginationData.pageSize),
                  ) : query(testsCollection,orderBy('createdAt','desc'),
                  // startAt(paginationData.page - 1 * paginationData.pageSize),
                  // limit(paginationData.pageSize),
                 );
    
    const coll = collection(db, collectionsKeys.tests);
    const countSnapshot = await getCountFromServer(coll);
    const docs = await getDocs(q);  
    const filteredDocs:any[] = [];
    const items = docs.docs.map(doc => {if(doc.data().price === 0){
        filteredDocs.push(doc);
        return doc.data();
    }}).filter(item => !!item);
    

    items.forEach((item,i) => {
        if(!item) return;
        item.id = filteredDocs[i].id;
    });
    
    return {tests:items as TestProductT[],count:countSnapshot.data().count};
}