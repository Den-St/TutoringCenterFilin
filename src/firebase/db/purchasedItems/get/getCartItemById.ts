import { collectionsKeys } from '../../collectionsKeys';
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../../initializeFirebase';
import { CartItemT } from '@/types/cartItem';

export const getCartItemById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.cartItems,id);
        const item = (await getDoc(document)).data();

        return {...item,id} as CartItemT;
    }catch(err){
        console.error(err);
    }
}
