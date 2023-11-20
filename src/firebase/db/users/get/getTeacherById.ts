import { UserT } from '../../../../types/user';
import { doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../../../initializeFirebase';
import { collectionsKeys } from '../../collectionsKeys';
import { getSubjectById } from '../../subjects/get/getSubjectById';
import { getDownloadURL, ref } from 'firebase/storage';

export const getTeacherById = async (userId:string) => {
    try{
        if(!userId) return;
        const document = doc(db,collectionsKeys.users,userId);
        const userDoc = (await getDoc(document));
        const user = userDoc.data();
        if(!user) return;
        const subjectsQ = user.teacherInfo.subjects.map(async (subject:string) => await getSubjectById(subject));
        const subjects = await Promise.all(subjectsQ);
        const photo = await getDownloadURL(ref(storage,user.photoURL));
    
        user.id = userDoc.id;
        user.teacherInfo.subject = subjects;
        user.photoURL = photo;

        return user as UserT;
    }catch(err){
        console.error(err);
    }
}