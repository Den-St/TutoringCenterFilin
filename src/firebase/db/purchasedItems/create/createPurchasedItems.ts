import { addDoc } from 'firebase/firestore';
import { CreatePurchasedItemT } from "@/types/purchasedItem";
import { purchasedItemsCollection } from '../../collectionsKeys';

export const createPurchasedItem = async (data:CreatePurchasedItemT) => {
    await addDoc(purchasedItemsCollection,data);
}