import { AnswerT } from './answer';
import { CourseThemeT } from './courseThemes';

export type TestT = {
    name:string,
    testURL:string,
}

export type TestForTestProductT = {
    name:string,
    testURL:string,
    isFree:boolean
}