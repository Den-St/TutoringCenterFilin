import { ClassT } from '../../../../types/class';
import { collectionsKeys } from '../../collectionsKeys';
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../../initializeFirebase';

export const getClassById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.classes,id);
        const classItem = (await getDoc(document)).data();

        return {...classItem,id} as ClassT;
    }catch(err){
        console.error(err);
    }
}
