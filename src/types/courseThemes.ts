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
    studyMaterialURL:string
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
    studyMaterials:ThemeStudyMaterialT[]
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