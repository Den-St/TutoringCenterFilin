import { routes } from "@/consts/routes";
import { getCartItemsCount } from "@/firebase/db/purchasedItems/get/getPurchasedItemsCount";
import { useAppSelector } from "@/hooks/redux";
import Link from "next/link";
import { useEffect, useState } from "react"
import {ShoppingCartOutlined} from '@ant-design/icons';
import { Spin } from "antd";
import { getCountFromServer, onSnapshot, query, where } from "firebase/firestore";
import { cartItemsCollection } from "@/firebase/db/collectionsKeys";

export const CartComponent = () => {
    const userId = useAppSelector(state => state.user.id);
    const [countOfItems,setCountOfItems] = useState(0);
    // const [loading,setLoading] = useState(false);

    // const fetch = async () => {
    //     if(!userId) return;
    //     setLoading(true);
    //     const res = await getCartItemsCount(userId);
    //     if(!res) {
    //         setLoading(false);
    //         return;
    //     }
    //     setLoading(false);
    //     setCountOfItems(res);
    // }
    useEffect(() => {
        const unsubscribe = onSnapshot(query(cartItemsCollection,where('user','==',userId)),(document) => {
            setCountOfItems(document.docs.length);
        })
        return () => unsubscribe();
    },[userId]);

    return <Link className="p-2 relative" href={routes.cart}>
                <ShoppingCartOutlined />
                <p className="absolute top-0 right-0 rounded-full">{countOfItems}</p>
            </Link>
}