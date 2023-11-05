import { collectionsKeys } from '../../collectionsKeys';
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../../initializeFirebase';
import { AboutUsSectionT } from '../../../../types/aboutUsSection';

export const getAboutUsSectionsById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.aboutUsSections,id);
        const item = (await getDoc(document)).data();

        return {...item,id} as AboutUsSectionT;
    }catch(err){
        console.error(err);
    }
}
