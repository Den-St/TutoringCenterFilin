import { query, where, getDocs } from "firebase/firestore";
import { lessonsCollection } from "../../collectionsKeys";

export const getIsAlreadyOrdered = async (userId:string,teacherId:string) => {
    const q = query(lessonsCollection,where('user',"==",userId),where('teacher','==',teacherId));
    const isAlreadyOrdered = (await getDocs(q)).docs.some(doc => doc.data().status === 'pending');
    
    return isAlreadyOrdered;
}