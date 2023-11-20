import { useCart } from "@/hooks/cart";
import { Button, Spin } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { CourseThemeT } from "@/types/courseThemes";
import { StudyMaterialT } from "@/types/studyMaterial";
import { TestProductT } from "@/types/testProduct";

export const CartPageComponent = () => {
    const {onDeleteCartItem,loading,cartItems,onBuy,formRef,signatureInputRef,dataInputRef} = useCart();

    return <div>
        <div className="m-10 p-4 border-black border-2 border-solid flex flex-col gap-3">
            {!loading.items 
            ? cartItems.map(cartItem => 
                <div key={cartItem.id} className="p-4 flex justify-between items-center border-black border-2 border-solid">
                    {cartItem.type === 'theme' && (cartItem.product as CourseThemeT).name}
                    {cartItem.type === 'studyMaterial' && (cartItem.product as StudyMaterialT).name}
                    {cartItem.type === 'test' && (cartItem.product as TestProductT).name}
                    <div className="flex gap-4 items-center">
                        {cartItem.product.price + ` грн.`}
                        <Button danger loading={loading.delete} disabled={loading.delete} onClick={() => onDeleteCartItem(cartItem.id)}><DeleteOutlined /></Button>
                    </div>
                </div>)     
            : <Spin/>}
            {!loading.items && !cartItems.length
            && <p className="text-white">
                В корзині нема товару
            </p>}
        </div>
        <Button disabled={!cartItems.length} onClick={onBuy}>Купити</Button>
        <form ref={formRef} method="POST" action="https://www.liqpay.ua/api/3/checkout" acceptCharset="utf-8">
            <input type="hidden" name="data" ref={dataInputRef}/>
            <input type="hidden" name="signature" ref={signatureInputRef}/>
            <input type={'submit'} style={{visibility:'hidden'}}/>
        </form>
    </div>
}