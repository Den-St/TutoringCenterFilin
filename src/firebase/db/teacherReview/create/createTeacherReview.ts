import { CreateTeacherReviewT } from './../../../../types/teacherReviewT';
import { addDoc } from 'firebase/firestore';
import { teacherReviewsCollection } from '../../collectionsKeys';

export const createTeacherReview = async (createReviewData:CreateTeacherReviewT) => {
    await addDoc(teacherReviewsCollection,{
        ...createReviewData,
        createdAt:new Date()
    })
}