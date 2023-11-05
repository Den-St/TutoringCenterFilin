import { getClassById } from './../../classes/get/getClassById';
import { collectionsKeys, coursesCollection } from '../../collectionsKeys';
import { query, startAt, limit, getDocs, orderBy, getCountFromServer, collection, where } from "firebase/firestore"
import { PaginationType } from '../../../../types/pagination';
import { CourseT } from '../../../../types/course';
import { db } from '../../../initializeFirebase';

export const getCoursesPaginated = async (paginationData:PaginationType,shortName?:string) => {
    console.log(paginationData)
    const q = shortName ? query(coursesCollection,orderBy('shortName','desc'),
                    where('shortName',">=",shortName || ''),   
                    where('shortName','<=',(shortName || '') + "\uf8ff"),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                    )
                   : query(coursesCollection,orderBy('createdAt','desc'),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                   );
    const coll = collection(db, collectionsKeys.courses);
    const countSnapshot = await getCountFromServer(coll);
    const docs = await getDocs(q);
    const courses = docs.docs.map(doc => doc.data());
    const classesQ = courses.map(async course => await getClassById(course.class));
    const classes = await Promise.all(classesQ);

    docs.docs.forEach((doc,i) => {
        courses[i].id = doc.id;
        courses[i].class = classes[i];
    });
    
    return {courses:courses as CourseT[],count:countSnapshot.data().count};
}