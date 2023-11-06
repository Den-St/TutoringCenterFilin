import { deleteDoc, doc } from "firebase/firestore";
import { cartItemsCollection } from "../../collectionsKeys";

export const deleteCartItemById = async (cartItemId:string) => {
    try{
        await deleteDoc(doc(cartItemsCollection,cartItemId),);
    }catch(err){
        console.error(err);
    }
}