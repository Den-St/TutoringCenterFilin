import { LessonT } from '../../../../types/lessons';
import { getUserById } from '../../users/get/getUserById';
import { lessonsCollection } from '../../collectionsKeys';
import { query, where, getDocs } from 'firebase/firestore';

export const getLessonsByUserId = async (userId:string) => {
    const q = query(lessonsCollection,where('user','==',userId));

    const docs =  (await getDocs(q)).docs;
    const items = docs.map(doc => doc.data());
    const teachersQ = items.map(async item => await getUserById(item.teacher)) 
    const teachers = await Promise.all(teachersQ);

    items.forEach((item,i) => {
        item.id = docs[i].id;
        item.teacher = teachers[i];
    });

    return items as LessonT[]
}