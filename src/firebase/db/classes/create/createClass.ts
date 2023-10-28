import { CreateClassType } from './../../../../types/class';
import { db } from './../../../initializeFirebase';
import { ref } from 'firebase/database';
import { classesCollection } from './../classes.collection';
import { addDoc } from 'firebase/firestore';
export const createClass = async (data:CreateClassType) => {
    try{
        await addDoc(classesCollection,data);
    }catch(err){
        console.error(err);
    }
}