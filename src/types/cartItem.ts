import { TestProductT } from '@/types/testProduct';
import { CourseThemeT } from './courseThemes';
import { StudyMaterialT } from './studyMaterial';
export type CartItemT = {
    id:string,
    product:CourseThemeT | StudyMaterialT | TestProductT,
    user:string
    type:CartItemTypeT
}

export type CreateCartItemT = {
    product:string
    type:CartItemTypeT,
    user:string
}

export type CartItemTypeT =  'theme' | 'studyMaterial' | 'test';