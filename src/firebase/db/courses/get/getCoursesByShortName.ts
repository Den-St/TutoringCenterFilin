import { CourseT } from './../../../../types/course';
import { coursesCollection } from './../../collectionsKeys';
import { query, where, getDocs } from 'firebase/firestore';

export const getCoursesByShortName = async (shortName:string) => {
    try{
        const q = query(coursesCollection,
            where('shortName',">=",shortName || ''),   
            where('shortName','<=',(shortName || '') + "\uf8ff"),
            );
        const docs = await getDocs(q);
        const coursesDocs = docs.docs;
        const courses = coursesDocs.map(classDoc => classDoc.data());

        courses.forEach((classItem,i) => classItem.id = coursesDocs[i]?.id);

        return courses as CourseT[];
    }catch(err){
        console.error(err);
    }
}