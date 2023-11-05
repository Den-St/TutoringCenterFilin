// import { collectionsKeys } from './../classes.collection
// import { ClassT } from './../../../../types/class';
// import { classesCollection, coursesCollection } from '../../collectionsKeys';
// import { query, startAt, limit, getDocs, orderBy, getCountFromServer, collection } from "firebase/firestore"
// import { PaginationType } from '../../../../types/pagination';
// import { db } from '../../../initializeFirebase';

// export const getClassesPaginated = async (paginationData:PaginationType) => {
//     console.log(paginationData)
//     const q = query(classesCollection,orderBy('number'),
//                     startAt(paginationData.page - 1 * paginationData.pageSize),
//                     limit(paginationData.pageSize),);
                    
//     const coll = collection(db, collectionsKeys.classes);
//     const countSnapshot = await getCountFromServer(coll);
//     const docs = await getDocs(q);
//     const classes = docs.docs.map(doc => doc.data());
//     docs.docs.forEach((doc,i) => classes[i].id = doc.id);

//     return {classes:classes as ClassT[],count:countSnapshot.data().count};
// }