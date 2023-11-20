import { collectionsKeys } from '../../collectionsKeys';
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../../initializeFirebase';
import { SubjectT } from '../../../../types/subject';

export const getSubjectById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.subjects,id);
        const item = (await getDoc(document)).data();

        return {...item,id} as SubjectT;
    }catch(err){
        console.error(err);
    }
}
