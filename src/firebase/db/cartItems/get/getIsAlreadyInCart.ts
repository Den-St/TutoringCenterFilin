import { cartItemsCollection } from '../../collectionsKeys';
import { query, getDocs, where  } from "firebase/firestore"

export const getIsAlredyInCart = async (userId:string,productId:string) => {
    const q = query(cartItemsCollection,where('user',"==",userId),where('product','==',productId));
    const isAlreadyInCart = !!(await getDocs(q)).docs.length;
    
    return isAlreadyInCart;
}