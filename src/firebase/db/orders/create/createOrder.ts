import { addDoc } from 'firebase/firestore';
import { CreateOrderT } from './../../../../types/order';
import { ordersCollection } from '../../collectionsKeys';

export const createOrder = async (data:CreateOrderT) => {
    const order = await addDoc(ordersCollection,{...data,products:data.products});
    return order.id;
}