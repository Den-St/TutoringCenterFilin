import { coursesCollection, courseThemesCollection } from '../../collectionsKeys';
import { query, where, getDocs } from 'firebase/firestore';
import { CourseThemeT } from '../../../../types/courseThemes';

export const getCourseThemesByCourseId = async (courseId:string) => {
    try{
        const q = query(courseThemesCollection,where('course',"==",courseId),);
        const docs = await getDocs(q);
        const courseThemesDocs = docs.docs;
        const themes = courseThemesDocs.map(courseTheme => courseTheme.data());

        themes.forEach((theme,i) => theme.id = courseThemesDocs[i]?.id);

        return themes as CourseThemeT[];
    }catch(err){
        console.error(err);
    }
}