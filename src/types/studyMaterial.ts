import { Timestamp } from "firebase/firestore";
import { ClassT } from "./class";
import { DocumentT } from "./document";
import { TestT } from "./test";
import { VideoLessonT } from "./videoLesson";

export type StudyMaterialT = {
    id:string,
    forTeachers:boolean,
    class:ClassT
    name:string;
    description:string
    createdAt:Timestamp
    videoLessons:VideoLessonT[]
    tests:TestT[]
    documents:DocumentT[]
    price:number,
    themes:string
    subscriptionDuration:number
}