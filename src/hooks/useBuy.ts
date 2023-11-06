import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector } from './redux';
import { useState } from 'react';
import { getIsAlredyInCart } from '@/firebase/db/cartItems/get/getIsAlreadyInCart';
import { addCartItem } from '@/firebase/db/cartItems/create/addCartItem';
import { CartItemTypeT } from '@/types/cartItem';

export const useBuy = (type:CartItemTypeT,productId:string) => {
    const userId = useAppSelector(state => state.user.id);
    const [loading,setLoading] = useState(false);
    const [isAlreadyInCart,setIsAlredyInCart] = useState(false);

    const fetchIsAlreadyInCart = async () => {
        if(!userId || !productId) return;
        setLoading(true);
        const res = await getIsAlredyInCart(userId,productId);
        setIsAlredyInCart(res);
        setLoading(false);
    }

    useEffect(() => {
        fetchIsAlreadyInCart();
    },[userId,productId]);

    const onBuy = async () => {
        if(!userId || !productId) return;
        setLoading(true);
        await addCartItem({user:userId,product:productId,type,});
        setIsAlredyInCart(true);
        setLoading(false);
    }

    return {onBuy,loading,isAlreadyInCart};
}