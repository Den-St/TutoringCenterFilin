import { useEffect, useRef } from 'react';
import { CartItemT } from '@/types/cartItem';
import { useState } from 'react';
import { useAppSelector } from './redux';
import { deleteCartItemById } from '@/firebase/db/cartItems/delete/deleteCartItemById';
import { getCartItemsByUserId } from '@/firebase/db/cartItems/get/getCartItemsByUserId';
import { createOrder } from '@/firebase/db/orders/create/createOrder';
import { private_key, public_key } from '@/consts/payment/paymentKeys';
import { base64_encode, getSignature, getStrToSignature } from '@/consts/payment/paymentInformationGenerator';
import { clearCart } from '@/firebase/db/cartItems/edit/clearCart';

export const useCart = () => {
    const user = useAppSelector(state => state.user);
    const [loading,setLoading] = useState<{items:boolean,delete:boolean,buy:boolean}>({items:false,delete:false,buy:false});
    const [cartItems,setCartItems] = useState<CartItemT[]>([]);
    // const [paymentData,setPaymentData] = useState<string>('');
    // const [paymentSignature,setPaymentSignature] = useState<string>('');
    const formRef = useRef<HTMLFormElement>(null)
    const dataInputRef = useRef<HTMLInputElement>(null)
    const signatureInputRef = useRef<HTMLInputElement>(null)

    const fetch = async () => {
        if(!user.id) return;

        setLoading(prev => ({...prev,items:true}));
        const res = await getCartItemsByUserId(user.id);
        if(!res) {
            setLoading(prev => ({...prev,items:false}));
            return;
        }
        setCartItems(res);
        setLoading(prev => ({...prev,items:false}));
    }

    useEffect(() => {
        fetch();
    },[user.id])

    const onDeleteCartItem = async (cartItemId:string) => {
        setLoading(prev => ({...prev,delete:true}));
        setCartItems(prev => prev.filter(item => item.id !== cartItemId));
        await deleteCartItemById(cartItemId);
        setLoading(prev => ({...prev,delete:false}));
    }

    const onBuy = async () => {
        if(!user.id || !cartItems.length || !dataInputRef.current || !signatureInputRef.current) return;
        setLoading(prev => ({...prev,buy:true}));

        const createdAt = new Date();
        const [order_id,_] = await Promise.all([
                await createOrder({user:user.id,products:cartItems.map(cartItem => ({product:cartItem.product.id,type:cartItem.type})),createdAt,status:'pending'})
                ,await clearCart(cartItems.map(cartItem => cartItem.id))
        ]);

        const version = "3";
        const action = "pay";
        const amount = cartItems.reduce((summ,cartItem) => summ + cartItem.product.price,0);
        const currency = "UAH";
        const description = 'Інформація про користувача:' + '\n' +
                            user.id + '\n' +
                            (user.displayName || '') + '\n' + 
                            user.name + ' ' + user.surname + ' ' + user.patronymic + '\n' +
                            'Інформація замовлення:' + '\n' +
                            createdAt.toDateString() + '\n' +
                            "Продукти:" + '\n' +
                            cartItems.map(cartItem => cartItem.product.name + '' + cartItem.product.id + '\n')
                            'сума платежу = ' + amount + '\n';
        const result_url = process.env.AFTER_PAYMENT_PAGE + `?order_id=${order_id}`;

        const json_string = {public_key,private_key,version,action,amount,currency,description,order_id,result_url};
        const data = base64_encode(json_string);
        const sign_string = getSignature(private_key || '',data);
        const signature = getStrToSignature(sign_string);

        // console.log('data',data);
        // console.log('signature',signature);
        setLoading(prev => ({...prev,buy:false}));

        dataInputRef.current.value = data;
        signatureInputRef.current.value = signature;
        // console.log('vvv',dataInputRef.current.value);
        // console.log('bbb',signatureInputRef.current.value);
        // console.log('ttt',json_string);
        formRef.current?.submit();
    }

    return {onDeleteCartItem,cartItems,loading,onBuy,formRef,dataInputRef,signatureInputRef};
}