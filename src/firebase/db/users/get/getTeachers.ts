import { UserT } from '@/types/user';
import { getDocs } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { usersCollection } from './../users.collection';
import { query } from 'firebase/firestore';
import { storage } from '@/firebase/initializeFirebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { getSubjectById } from '../../subjects/get/getSubjectById';

export const getTeachers = async () => {
    const q = query(usersCollection,where('isTeacher','==',true));

    const docs = (await getDocs(q)).docs;
    const items = docs.map(doc => doc.data());
    const subjectsArraysQ = items.map(item => item.teacherInfo.subjects.map(async (subject:string) => await getSubjectById(subject)));
    const subjectsArrays = await Promise.all(subjectsArraysQ.map(async arr => await Promise.all(arr)));
    const photosQ = items.map(async item => item.photoURL ? await getDownloadURL(ref(storage,item.photoURL)) : '');
    const photos = await Promise.all(photosQ);

    items.forEach((item,i) => {
        item.id = docs[i].id;
        item.photoURL = photos[i]
        item.teacherInfo.subjects = subjectsArrays[i]
    });

    return items as UserT[];
}