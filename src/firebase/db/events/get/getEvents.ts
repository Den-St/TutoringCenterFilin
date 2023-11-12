import { eventsCollection } from './../../collectionsKeys';
import { query,getDocs, orderBy,} from "firebase/firestore"
import { EventT } from '@/types/event';
import { storage } from '@/firebase/initializeFirebase';
import { getDownloadURL, ref } from 'firebase/storage';

export const getEvents = async () => {
    const q = query(eventsCollection,orderBy('createdAt','desc'),)

    const docs = await getDocs(q);
    const items = docs.docs.map(doc => doc.data());
    const photosArraysQ = items.map((item) => item.photos && item.photos.map(async (photo: string | undefined) => await getDownloadURL(ref(storage,photo))));
    const photosQ = photosArraysQ.map(async arr => arr && await Promise.all(arr));
    const photos = await Promise.all(photosQ);

    docs.docs.forEach((doc,i) => {
        items[i].id = doc.id;
        items[i].photos = photos[i];
    });
    
    return items as EventT[];
}