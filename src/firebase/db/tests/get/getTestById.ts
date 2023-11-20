import { TestProductT } from '@/types/testProduct';
import { db } from "@/firebase/initializeFirebase";
import { doc, getDoc } from "firebase/firestore";
import { collectionsKeys } from "../../collectionsKeys";

export const getTestById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.tests,id);
        const item = (await getDoc(document)).data();

        return {...item,id} as TestProductT;
    }catch(err){
        console.error(err);
    }
}