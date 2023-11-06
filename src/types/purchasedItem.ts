import { CartItemTypeT } from '@/types/cartItem';
import { UserT } from './user';
import { CourseThemeT } from './courseThemes';
import { Timestamp } from 'firebase/firestore';

export type PurchasedItemsT = {
    id:string
    createdAt:Timestamp
    product:CourseThemeT
    user:UserT
    theme:CartItemTypeT
}