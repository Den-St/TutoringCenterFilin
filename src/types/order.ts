import { CartItemTypeT } from '@/types/cartItem';
import { Timestamp } from 'firebase/firestore';
import { UserT } from '@/types/user';
import { CartItemT } from './cartItem';

export type OrderStatusT = 'pending' | 'success';
export type OrderProductT = {product:string,type:CartItemTypeT};
export type OrderT = {
    id:string
    user:UserT
    createdAt:Timestamp
    products:CartItemT[],
    status:OrderStatusT
}

export type CreateOrderT = {
    user:string
    createdAt:Date
    products:OrderProductT[],
    status:OrderStatusT
}
