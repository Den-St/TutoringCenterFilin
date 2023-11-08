import { cartItemsCollection, collectionsKeys, purchasedItemsCollection } from '../../collectionsKeys';
import { db } from './../../../initializeFirebase';
import { collection, getCountFromServer, query ,where} from "firebase/firestore";

export const getCartItemsCount = async (userId:string) => {
    const q = query(cartItemsCollection,where('user','==',userId));
    const countSnapshot = await getCountFromServer(q);
    console.log('gsdfgd',countSnapshot.data().count);

    return countSnapshot.data().count;
}

