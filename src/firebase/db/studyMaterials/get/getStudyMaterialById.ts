import { collectionsKeys } from '../../collectionsKeys';
import { doc, getDoc } from "firebase/firestore"
import { db, storage } from '../../../initializeFirebase';
import { StudyMaterialT } from '@/types/studyMaterial';
import { DocumentT } from '@/types/document';
import { getDownloadURL, ref } from 'firebase/storage';

export const getStudyMaterialById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.studyMaterials,id);
        const item = (await getDoc(document)).data();
        if(!item) return;
        const documentsURLSQ = item?.documents.map(async (doc:DocumentT) => await getDownloadURL(ref(storage,doc.documentURL)));
        const documentsURLS = await Promise.all(documentsURLSQ);

        item.documents.forEach((doc:DocumentT,i:number) => doc.documentURL = documentsURLS[i])
        
        return {...item,id} as StudyMaterialT;
    }catch(err){
        console.error(err);
    }
}
