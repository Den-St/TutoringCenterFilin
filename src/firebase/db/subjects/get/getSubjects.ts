import { SubjectT } from './../../../../types/subject';
import { query, where, getDocs } from 'firebase/firestore';
import { subjectsCollection } from '../../collectionsKeys';
export const getSubjects = async () => {
    const q = query(subjectsCollection,where('isActive','==',true));
    const docs = (await getDocs(q)).docs;
    const items = docs.map(doc => doc.data());

    items.forEach((item,i) => item.id = docs[i].id);

    return items as SubjectT[]
}