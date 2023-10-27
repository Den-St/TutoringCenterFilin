import { usersCollection } from '../users.collection';
import { addDoc } from "firebase/firestore";
import { CreateUserT } from '../../../../types/user';

export const createUser = async (user:CreateUserT) => {
    console.log('create',user)
    try{
        await addDoc(usersCollection,
            {
                ...user,
            });
    }catch(err){
        console.error(err);
    }
}