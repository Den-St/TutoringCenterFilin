import { orderBy } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { testsCollection } from './../../collectionsKeys';
import { query } from 'firebase/firestore';
import { TestT } from '@/types/test';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/firebase/initializeFirebase';

export const getTestsByCourseThemeId = async (courseThemeId:string) => {
    try{
        const q = query(testsCollection,where('courseTheme','==',courseThemeId),orderBy('number','asc'));
        const docs = (await getDocs(q)).docs;
        const tests = docs.map(doc => doc.data());
        const photosArraysQ = tests.map((test) => test.photos && test.photos.map(async (photo: string | undefined) => await getDownloadURL(ref(storage,photo))));
        const photosQ = photosArraysQ.map(async arr => arr && await Promise.all(arr));
        const photos = await Promise.all(photosQ);
        tests.forEach((test,i) => {
            test.id = docs[i].id
            test.photos = photos[i]
        });

        return tests as TestT[];
    }catch(err){
        console.error(err);
    }
}