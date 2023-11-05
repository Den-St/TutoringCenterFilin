import { aboutUsSectionCollection } from '../../collectionsKeys';
import { query, getDocs, orderBy  } from "firebase/firestore"
import { AboutUsSectionT } from '../../../../types/aboutUsSection';

export const getAllAboutUsSections = async () => {
    const q = query(aboutUsSectionCollection,orderBy('number','asc'),)
    const docs = await getDocs(q);
    const items = docs.docs.map(doc => doc.data());

    docs.docs.forEach((doc,i) => {
        items[i].id = doc.id;
    });
    
    return items as AboutUsSectionT[];
}