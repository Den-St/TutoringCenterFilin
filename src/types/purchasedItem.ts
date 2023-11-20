import { TestProductT } from '@/types/testProduct';
import { CartItemTypeT } from '@/types/cartItem';
import { UserT } from './user';
import { CourseThemeT } from './courseThemes';
import { Timestamp } from 'firebase/firestore';
import { StudyMaterialT } from './studyMaterial';

export type PurchasedItemT = {
    id:string
    createdAt:Timestamp
    product:CourseThemeT | TestProductT | StudyMaterialT
    user:UserT
    type:CartItemTypeT
}

export type CreatePurchasedItemT = {
    user:string
    product:string
    type:CartItemTypeT
    createdAt:Date
}