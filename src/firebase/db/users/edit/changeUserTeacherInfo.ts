import { setDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { usersCollection } from './../users.collection';
import { UserT, ChangeUserT } from './../../../../types/user';

export const changeUserTeacherInfo = async (userData:ChangeUserT) => {
    const ref = doc(usersCollection,userData.id);

    await setDoc(ref,{...userData});
}