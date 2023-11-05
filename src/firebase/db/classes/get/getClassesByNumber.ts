import { ClassT } from '../../../../types/class';
import { query, where, getDocs } from 'firebase/firestore';
import { classesCollection } from '../../collectionsKeys';

export const getClassesByNumber = async (number:number) => {
    try{
        const q = query(classesCollection,where('number','==',number));
        const docs = await getDocs(q);
        const classesDocs = docs.docs;
        const classes = classesDocs.map(classDoc => classDoc.data());
        console.log(classesDocs[0]?.id)

        classes.forEach((classItem,i) => classItem.id = classesDocs[i]?.id);

        return classes as ClassT[];
    }catch(err){
        console.error(err);
    }
}