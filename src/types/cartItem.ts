import { CourseThemeT } from './courseThemes';
export type CartItemT = {
    id:string,
    product:CourseThemeT,
    user:string
    type:CartItemTypeT
}

export type CreateCartItemT = {
    product:string
    type:CartItemTypeT,
    user:string
}

export type CartItemTypeT = 'test' | 'theme';