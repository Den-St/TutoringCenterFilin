import { Timestamp } from 'firebase/firestore';
import { ClassT } from './class';

export type CourseT = {
    id:string;
    class:ClassT,
    shortName?:string
    description:string
    secondName:string
    createdAt:Timestamp
    isActive:boolean
}

