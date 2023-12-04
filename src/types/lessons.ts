import { Timestamp } from 'firebase/firestore';
import { UserT } from '@/types/user';
export type CreateLessonT = {
    user:string
    teacher:string
    createdAt:Date
    status:LessonStatuses.notConfirmed,
    theme:'',
    date:null,
    link:''
}
export type LessonStatusT = 'not confirmed' | 'confirmed' | 'ended';
export enum LessonStatuses {
    notConfirmed = 'not confirmed',
    confirmed = 'confirmed',
    ended = 'ended'
};
export const LessonStatusesToUA = {
    'not confirmed': "Не підтверджено",
    'confirmed': "Підтверджено",
    'ended': "Завершено"
};
export type LessonT = {
    id:string
    user:UserT
    teacher:UserT
    createdAt:Timestamp
    status:LessonStatusT,
    theme:string,
    date:Timestamp,
    link:string
}