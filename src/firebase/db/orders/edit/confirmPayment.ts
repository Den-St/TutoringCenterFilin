import { setDoc } from 'firebase/firestore';
import { db } from '@/firebase/initializeFirebase';
import { collectionsKeys } from './../../collectionsKeys';
import { doc, getDoc } from 'firebase/firestore';
import { OrderProductT } from '@/types/order';
import { createPurchasedItem } from '../../purchasedItems/create/createPurchasedItems';

export const confirmPayment = async (orderId:string) => {
    const document = doc(db,collectionsKeys.orders,orderId);
    const item = (await getDoc(document)).data();
    console.log('ggg',item)
    if(item?.status !== 'pending') return;
    await setDoc(document,{...item,status:'success'});
    
    const queries:any[] = [];
    item.products.forEach((product:OrderProductT) => queries.push(async () => await createPurchasedItem({createdAt:new Date(),product:product.product,type:product.type,user:item.user})));
    await Promise.all(queries.map(async q => await q()));
    
}