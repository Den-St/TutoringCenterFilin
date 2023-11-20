import { doc, setDoc } from "firebase/firestore";
import { ChangeSubjectT } from "../../../../types/subject";
import { db } from "../../../initializeFirebase";
import { collectionsKeys } from "../../collectionsKeys";

export const changeSubject = async (id:string,newData:ChangeSubjectT) => {
    try{
        const ref = doc(db,collectionsKeys.subjects,id);
        await setDoc(ref,{
            ...newData,
            createdAt:new Date()
        });
    }catch(err){
        console.error(err);
    }
   
}