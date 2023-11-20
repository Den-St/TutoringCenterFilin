import { cartItemsCollection } from './../../collectionsKeys';
import { deleteDoc, doc } from "firebase/firestore";

export const clearCart = async (cartItemsIds:string[]) => {
    await Promise.all(cartItemsIds.map(async cartItemId => await deleteDoc(doc(cartItemsCollection,cartItemId))));
}