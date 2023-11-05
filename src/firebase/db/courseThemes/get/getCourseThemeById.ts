import { CourseThemeT } from './../../../../types/courseThemes';
import { collectionsKeys } from '../../collectionsKeys';
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../../initializeFirebase';

export const getCourseThemeById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.courseThemes,id);
        const courseTheme = (await getDoc(document)).data();

        return {...courseTheme,id} as CourseThemeT;
    }catch(err){
        console.error(err);
    }
}
