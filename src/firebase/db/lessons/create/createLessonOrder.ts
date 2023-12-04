import { lessonsCollection } from '../../collectionsKeys';
import { addDoc } from 'firebase/firestore';
import { CreateLessonT } from "@/types/lessons";

export const createLessonOrder = async (data:CreateLessonT) => {
    await addDoc(lessonsCollection,data);
}