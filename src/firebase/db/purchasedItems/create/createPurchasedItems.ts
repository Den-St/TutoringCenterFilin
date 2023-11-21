import { addDoc } from 'firebase/firestore';
import { CreatePurchasedItemT } from "@/types/purchasedItem";
import { purchasedItemsCollection } from '../../collectionsKeys';

export const createPurchasedItem = async (data:CreatePurchasedItemT) => {
    console.count('zxc');
    await addDoc(purchasedItemsCollection,data);
}