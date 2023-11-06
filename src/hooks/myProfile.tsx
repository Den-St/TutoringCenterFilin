import { useEffect, useState } from "react";
import { useAppSelector } from "./redux"
import { getPurchasedItemsByUserId } from "@/firebase/db/purchasedItems/get/getPurchasedItemsByUserId";
import { PurchasedItemsT } from "@/types/purchasedItem";

export const useMyProfile = () => {
    const user = useAppSelector(state => state.user);
    const [loading,setLoading] = useState<{items:boolean}>({items:false});
    const [purchasedItems,setPurchasedItems] = useState<PurchasedItemsT[]>([]);

    const fetchPurchasedItems = async () => {
        if(!user.id) return;
        setLoading(prev => ({...prev,items:true}));
        const res = await getPurchasedItemsByUserId(user.id);
        if(!res) {
            setLoading(prev => ({...prev,items:false}));
            return;
        }
        setPurchasedItems(res);
        setLoading(prev => ({...prev,items:false}));
    }

    useEffect(() => {
        fetchPurchasedItems();
    }, [user.id])
    console.log(purchasedItems)
    return {user,loading,purchasedItems};
}