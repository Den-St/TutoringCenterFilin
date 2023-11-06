import { useEffect } from 'react';
import { CartItemT } from '@/types/cartItem';
import { useState } from 'react';
import { useAppSelector } from './redux';
import { deleteCartItemById } from '@/firebase/db/cartItems/delete/deleteCartItemById';
import { getCartItemsByUserId } from '@/firebase/db/cartItems/get/getCartItemsByUserId';
export const useCart = () => {
    const userId = useAppSelector(state => state.user.id);
    const [loading,setLoading] = useState<{items:boolean,delete:boolean}>({items:false,delete:false});
    const [cartItems,setCartItems] = useState<CartItemT[]>([]);

    const fetch = async () => {
        if(!userId) return;

        setLoading(prev => ({...prev,items:true}));
        const res = await getCartItemsByUserId(userId);
        if(!res) {
            setLoading(prev => ({...prev,items:false}));
            return;
        }
        setCartItems(res);
        setLoading(prev => ({...prev,items:false}));
    }

    useEffect(() => {
        fetch();
    },[userId])

    const onDeleteCartItem = async (cartItemId:string) => {
        setLoading(prev => ({...prev,delete:true}));
        setCartItems(prev => prev.filter(item => item.id !== cartItemId));
        await deleteCartItemById(cartItemId);
        setLoading(prev => ({...prev,delete:false}));
    }

    return {onDeleteCartItem,cartItems,loading};
}