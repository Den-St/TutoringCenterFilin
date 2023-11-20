import { Timestamp } from 'firebase/firestore';

export type TeacherReviewT = {
    id:string
    text:string
    authorName:string
    createdAt:Timestamp
}

export type CreateTeacherReviewT = {
    text:string
    authorName:string
    teacher:string
}