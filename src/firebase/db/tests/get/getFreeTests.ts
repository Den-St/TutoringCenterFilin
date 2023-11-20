import { TestProductT } from '@/types/testProduct';
import { testsCollection } from './../../collectionsKeys';
import { db } from './../../../initializeFirebase';
import { getDocs, query, where } from 'firebase/firestore';

export const getFreeTests = async () => {
    const q = query(testsCollection,where('price','==',0),);

    const docs = (await getDocs(q)).docs;
    const items = docs.map(doc => doc.data());

    items.forEach((item,i) => {
        item.id = docs[i].id
    });

    return items as TestProductT[]
}