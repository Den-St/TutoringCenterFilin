import { collectionsKeys } from '../../collectionsKeys';
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../../initializeFirebase';
import { getRealItemByProducIdFunctions } from '@/consts/getRealItemByProducIdFunctions';
import { CartItemTypeT } from '@/types/cartItem';

export const getPurchasedItemById = async (id:string,userId:string) => {
    try{
        const document = doc(db,collectionsKeys.purchasedItems,id);
        const item = (await getDoc(document)).data();
        if(item?.user !== userId) return; 
        if(!item) return;

        const product = await getRealItemByProducIdFunctions[item.type as CartItemTypeT](item.product);

        return {product,type:item.type as CartItemTypeT};
    }catch(err){
        console.error(err);
    }
}
