import { CreateClassType } from '../../../../types/class';
import { addDoc } from 'firebase/firestore';
import { classesCollection, subjectsCollection } from '../../collectionsKeys';
import { CreateSubjectT } from '../../../../types/subject';

export const createSubject = async (data:CreateSubjectT) => {
    try{
        await addDoc(subjectsCollection,{...data,createdAt:new Date()});
    }catch(err){
        console.error(err);
    }
}