import { where } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { limit, orderBy, query } from 'firebase/firestore';
import { studyMaterialsCollection } from '../../collectionsKeys';
import { StudyMaterialT } from '@/types/studyMaterial';

export const getLastFreeStudyMaterials = async (limitNumber:number) => {
    const q = query(studyMaterialsCollection,
        // limit(limitNumber),
        where('isActive','==',true),
        where('price','==',0));
    const docs = await getDocs(q);

    const items = docs.docs.map(doc => doc.data());

    docs.docs.forEach((doc,i) => {
        items[i].id = doc.id;
    });
    
    return items.sort((item,nextItem) => item.createdAt.nanoseconds - nextItem.createdAt.nanoseconds) as StudyMaterialT[];
}