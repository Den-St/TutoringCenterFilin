import { purchasedItemsCollection } from './../../collectionsKeys';
import { CartItemTypeT } from '@/types/cartItem';
import { getDocs } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { PurchasedItemT } from '@/types/purchasedItem';
import { getRealItemByProducIdFunctions } from '@/consts/getRealItemByProducIdFunctions';

export const getPurchasedItemsByUserId = async (userId:string) => {
    try{
        const q = query(purchasedItemsCollection,where('user','==',userId));
        const docs = (await getDocs(q)).docs;
        const purchasedItems = docs.map(doc => doc.data());
        const productsQ = purchasedItems.map(async item => getRealItemByProducIdFunctions[item.type as CartItemTypeT](item.product));
        const products = await Promise.all(productsQ);
        
        purchasedItems.forEach((item,i) => {
            item.id = docs[i].id;
            item.product = products[i];
        });
        return purchasedItems as PurchasedItemT[];
    }catch(err){
        console.error(err);
    }
} 