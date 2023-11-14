import { CourseThemeT } from './courseThemes';
import { StudyMaterialT } from './studyMaterial';
export type CartItemT = {
    id:string,
    product:CourseThemeT | StudyMaterialT,
    user:string
    type:CartItemTypeT
}

export type CreateCartItemT = {
    product:string
    type:CartItemTypeT,
    user:string
}

export type CartItemTypeT =  'theme' | 'studyMaterial';