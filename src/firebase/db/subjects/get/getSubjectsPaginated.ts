import { SubjectT } from './../../../../types/subject';
import { collectionsKeys, subjectsCollection } from '../../collectionsKeys';
import { ClassT } from '../../../../types/class';
import { classesCollection, coursesCollection } from '../../collectionsKeys';
import { query, startAt, limit, getDocs, orderBy, getCountFromServer, collection } from "firebase/firestore"
import { PaginationType } from '../../../../types/pagination';
import { db } from '../../../initializeFirebase';

export const getSubjectsPaginated = async (paginationData:PaginationType) => {
    console.log(paginationData)
    const q = query(subjectsCollection,orderBy('createdAt','desc'),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                    );
                    
    const coll = collection(db, collectionsKeys.classes);
    const countSnapshot = await getCountFromServer(coll);
    const docs = await getDocs(q);
    const items = docs.docs.map(doc => doc.data());
    docs.docs.forEach((doc,i) => items[i].id = doc.id);

    return {items:items as SubjectT[],count:countSnapshot.data().count};
}