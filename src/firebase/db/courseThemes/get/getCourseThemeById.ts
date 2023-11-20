import { CourseThemeT } from './../../../../types/courseThemes';
import { collectionsKeys } from '../../collectionsKeys';
import { doc, getDoc } from "firebase/firestore"
import { db, storage } from '../../../initializeFirebase';
import { DocumentT } from '@/types/document';
import { getDownloadURL, ref } from 'firebase/storage';

export const getCourseThemeById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.courseThemes,id);
        const courseTheme = (await getDoc(document)).data();
        console.log('gg',courseTheme,id);
        if(!courseTheme) return;
        const documentsURLSQ = courseTheme?.documents.map(async (doc:DocumentT) => await getDownloadURL(ref(storage,doc.documentURL)));
        const documentsURLS = await Promise.all(documentsURLSQ);

        courseTheme.documents.forEach((doc:DocumentT,i:number) => {
            doc.documentURL = documentsURLS[i];
        });

        return {...courseTheme,id} as CourseThemeT;
    }catch(err){
        console.error(err);
    }
}
