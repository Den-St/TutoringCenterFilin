'use client'
import { routes } from "@/consts/routes";
import { useAppSelector } from "@/hooks/redux"
import { useBuy } from "@/hooks/useBuy";
import { CartItemTypeT } from "@/types/cartItem";
import { CourseT } from "@/types/course";
import { CourseThemeT } from "@/types/courseThemes";
import { StudyMaterialT } from "@/types/studyMaterial";
import { TestProductT } from "@/types/testProduct";
import { Button, Spin } from "antd"
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
    product:CourseThemeT | TestProductT | StudyMaterialT,
    productType:CartItemTypeT
}

export const BuyProductButton:React.FC<Props> = ({product,productType}) => {
    const isAuthed = !!useAppSelector(user => user.user.id);
    
    const {onBuy,isAlreadyInCart,loading,contextHolder} = useBuy(productType,product.id,product.name);

    if(loading) return <div><Spin/></div>
    return isAuthed ? <>
                        {contextHolder}
                        <Button style={{'background':'#7979ff8c'}} disabled={isAlreadyInCart} onClick={onBuy} loading={loading}>
                          {!isAlreadyInCart ? `Купити за ${product.price} грн.` : 'Тема вже в корзині'}
                        </Button>
                      </>
                    : <Link href={routes.logIn}>Купити за {product.price} грн.</Link>
}