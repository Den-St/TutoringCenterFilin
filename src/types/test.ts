import { AnswerT } from './answer';
import { CourseThemeT } from './courseThemes';

export type TestT = {
    id:string
    courseTheme:CourseThemeT,
    number:number,
    photos:string[]
    description:string,
    answers:Record<number,AnswerT>
    isActive:boolean
}

