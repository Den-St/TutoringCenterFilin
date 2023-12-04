import { UserT } from '@/types/user';
import { db } from "@/firebase/initializeFirebase";
import { doc, getDoc } from "firebase/firestore";
import { collectionsKeys } from "../../collectionsKeys";

export const getUserById = async (userId:string) => {
    const document = doc(db,collectionsKeys.users,userId);
    const userDoc = (await getDoc(document));
    const user = userDoc.data();

    return {...user,id:userId} as UserT;
}