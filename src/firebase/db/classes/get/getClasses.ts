import { ClassT } from './../../../../types/class';
import { classesCollection, collectionsKeys, coursesCollection } from '../../collectionsKeys';
import { query, startAt, limit, getDocs, orderBy, getCountFromServer, collection } from "firebase/firestore"
import { PaginationType } from '../../../../types/pagination';
import { db } from '../../../initializeFirebase';

export const getClasses = async () => {
    const q = query(classesCollection,orderBy('number','desc'),);
                    
    const docs = await getDocs(q);
    const classes = docs.docs.map(doc => doc.data());
    docs.docs.forEach((doc,i) => classes[i].id = doc.id);

    return classes as ClassT[];
}