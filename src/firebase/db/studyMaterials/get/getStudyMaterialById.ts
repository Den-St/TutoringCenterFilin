import { collectionsKeys } from '../../collectionsKeys';
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../../initializeFirebase';
import { StudyMaterialT } from '@/types/studyMaterial';

export const getStudyMaterialById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.studyMaterials,id);
        const item = (await getDoc(document)).data();

        return {...item,id} as StudyMaterialT;
    }catch(err){
        console.error(err);
    }
}
