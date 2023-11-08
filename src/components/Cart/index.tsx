import { useCart } from "@/hooks/cart";
import { Button, Spin } from "antd";
import { DeleteOutlined } from '@ant-design/icons';

export const CartPageComponent = () => {
    const {onDeleteCartItem,loading,cartItems} = useCart();

    return <div className="m-10 p-4 border-black border-2 border-solid flex flex-col gap-3">
        {!loading.items 
        ? cartItems.map(cartItem => 
            <div key={cartItem.id} className="p-4 flex justify-between items-center border-black border-2 border-solid">
                {cartItem.product.name}
                <div className="flex gap-4 items-center">
                    {cartItem.product.price + ` грн.`}
                    <Button danger loading={loading.delete} disabled={loading.delete} onClick={() => onDeleteCartItem(cartItem.id)}><DeleteOutlined /></Button>
                </div>
            </div>)     
        : <Spin/>}
    </div>
}