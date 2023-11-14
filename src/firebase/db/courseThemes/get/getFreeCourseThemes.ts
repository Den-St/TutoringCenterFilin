import { CourseThemeT } from '@/types/courseThemes';
import { getDocs, orderBy } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { courseThemesCollection } from './../../collectionsKeys';
import { query } from 'firebase/firestore';

export const getFreeCourseThemes = async () => {
    try{
        const q = query(courseThemesCollection,orderBy('createdAt','desc'),where('price','==',0),where('isActive','==',true));

        const docs = (await getDocs(q)).docs;
        const items = docs.map(doc => doc.data());

        items.forEach((item,i) => {
            item.id = docs[i].id;
        });

        return items as CourseThemeT[];
    }catch(err){
        console.error(err);
    }
}