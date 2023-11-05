import { Timestamp } from 'firebase/firestore';
import { CourseT } from './course';
import { VideoLessonT } from './videoLesson';

export type CourseThemeT = {
    id:string
    course:CourseT
    name:string
    subscriptionDuration:number
    price:number
    isActive:boolean
    createdAt:Timestamp | null
}


export type ChangeCourseThemeWithCourseT = {
    course:CourseT
    name:string
    subscriptionDuration:number
    price:number
    isActive:boolean
}