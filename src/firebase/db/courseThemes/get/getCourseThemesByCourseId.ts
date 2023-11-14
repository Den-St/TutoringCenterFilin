import { orderBy } from 'firebase/firestore';
import { coursesCollection, courseThemesCollection } from './../../collectionsKeys';
import { query, where, getDocs } from 'firebase/firestore';
import { CourseThemeT } from '../../../../types/courseThemes';

export const getCourseThemesByCourseId = async (courseId:string) => {
    try{
        const q = query(courseThemesCollection,where('course',"==",courseId),where('price','!=',0),);
        const docs = await getDocs(q);
        const courseThemesDocs = docs.docs;
        const themes = courseThemesDocs.map(courseTheme => courseTheme.data());
       
        themes.forEach((theme,i) => theme.id = courseThemesDocs[i]?.id);
        // console.log(themes);
        return themes as CourseThemeT[];
    }catch(err){
        console.error(err);
    }
}