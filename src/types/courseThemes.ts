import { Timestamp } from 'firebase/firestore';
import { CourseT } from './course';
import { VideoLessonT } from './videoLesson';


type videoLessonT = {
    name:string,
    videoURL:string,
    description:string
}
type ThemeTestT = {
    name:string,
    testURL:string,
}
type ThemeStudyMaterialT = {
    name:string,
    documentURL:string
}
export type CourseThemeT = {
    id:string
    course:CourseT
    name:string
    subscriptionDuration:number
    price:number,
    isActive:boolean,
    videoLessons:videoLessonT[],
    tests:ThemeTestT[],
    documents:ThemeStudyMaterialT[]
    createdAt:Timestamp | null
}

// export type CourseThemeT = {
//     id:string
//     course:CourseT
//     name:string
//     subscriptionDuration:number
//     price:number
//     isActive:boolean
//     createdAt:Timestamp | null
// }


export type ChangeCourseThemeWithCourseT = {
    course:CourseT
    name:string
    subscriptionDuration:number
    price:number
    isActive:boolean
}