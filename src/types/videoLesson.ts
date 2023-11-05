import { CourseThemeT } from './courseThemes';
export type VideoLessonT = {
    id:string,
    videoURL:string,
    name:string,
    description:string,
    courseTheme:CourseThemeT
    number:number,
    isActive:boolean
}
