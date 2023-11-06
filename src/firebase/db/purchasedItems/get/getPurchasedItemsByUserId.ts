import { purchasedItemsCollection } from './../../collectionsKeys';
import { getCourseThemeById } from '../../courseThemes/get/getCourseThemeById';
import { CartItemT } from '@/types/cartItem';
import { getDocs } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { cartItemsCollection } from '../../collectionsKeys';
import { PurchasedItemsT } from '@/types/purchasedItem';

export const getPurchasedItemsByUserId = async (userId:string) => {
    try{
        const q = query(purchasedItemsCollection,where('user','==',userId));
        const docs = (await getDocs(q)).docs;
        const cartItems = docs.map(doc => doc.data());
        const productsQ = cartItems.map(async item => item.type === 'theme' && await getCourseThemeById(item.product));
        const products = await Promise.all(productsQ);
        
        cartItems.forEach((item,i) => {
            item.id = docs[i].id;
            item.product = products[i];
        });
        return cartItems as PurchasedItemsT[];
    }catch(err){
        console.error(err);
    }
} 