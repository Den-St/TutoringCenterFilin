import { classesCollection } from './../classes.collection';
import { query, startAt, limit, getDocs, orderBy, count, getCountFromServer } from "firebase/firestore"
import { Class } from '@/types/class';
import { PaginationType } from '@/types/pagination';

export const getClassesPaginated = async (paginationData:PaginationType) => {
    const q = query(classesCollection,orderBy('number'),
                    startAt(paginationData.page - 1 * paginationData.pageSize),
                    limit(paginationData.pageSize),);
    const countSnapshot = await getCountFromServer(q);
    const docs = await getDocs(q);
    const classes = docs.docs.map(doc => doc.data());
    docs.docs.forEach((doc,i) => classes[i].id = doc.id);

    return {classes:classes as Class[],count:countSnapshot.data().count};
}