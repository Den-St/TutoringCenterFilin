import { addDoc } from 'firebase/firestore';
import { CreateCartItemT } from "@/types/cartItem";
import { cartItemsCollection } from '../../collectionsKeys';

export const addCartItem = async (data:CreateCartItemT) => {
    try{
        await addDoc(cartItemsCollection,data);
    }catch(err){
        console.error(err);
    }
}