import { UserT } from './../../../../types/user';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../initializeFirebase';
import { collectionsKeys } from '../../collectionsKeys';
export const getUserById = async (userId:string) => {
    try{
        if(!userId) return;
        const document = doc(db,collectionsKeys.users,userId);
        const userDoc = (await getDoc(document));
        const user = userDoc.data();
        if(!user) return;
        user.id = userDoc.id;

        return user as UserT;
    }catch(err){
        console.error(err);
    }
}