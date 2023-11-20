import { ClassT } from './class';
import { CourseT } from "./course"
import { SubjectT } from "./subject"
import { TestForTestProductT } from "./test"

export type TestProductT = {
    id:string
    course:CourseT
    name:string
    subscriptionDuration:number
    price:number,
    isActive:boolean,
    tests:TestForTestProductT[],
    subject:SubjectT
    class:ClassT
}