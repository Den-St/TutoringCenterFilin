import { getDocs } from 'firebase/firestore';
import { orderBy } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { teacherReviewsCollection } from './../../collectionsKeys';
import { query } from 'firebase/firestore';
import { TeacherReviewT } from '@/types/teacherReviewT';

export const getTeacherReviewsByTeacherId = async (teacherId:string) => {
    const q = query(teacherReviewsCollection,where('teacher','==',teacherId),orderBy('createdAt','desc'));
    const docs = (await getDocs(q)).docs;

    const items = docs.map(doc => doc.data());
    return items as TeacherReviewT[];
}