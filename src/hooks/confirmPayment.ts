import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/hooks/redux';
import { confirmPayment } from '@/firebase/db/orders/edit/confirmPayment';
export const useConfirmPayment = () => {
    const orderId = useSearchParams().get('order_id') as string; 
    
    useEffect(() => {
        if(!orderId) return;
        confirmPayment(orderId);
    },[orderId]);
}