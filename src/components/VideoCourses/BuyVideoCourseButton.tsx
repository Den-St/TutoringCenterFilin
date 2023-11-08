'use client'
import { routes } from "@/consts/routes";
import { useAppSelector } from "@/hooks/redux"
import { useBuy } from "@/hooks/useBuy";
import { CourseT } from "@/types/course";
import { CourseThemeT } from "@/types/courseThemes";
import { Button, Spin } from "antd"
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
    courseTheme:CourseThemeT,
}

export const BuyVideoCourseButton:React.FC<Props> = ({courseTheme}) => {
    const isAuthed = !!useAppSelector(user => user.user.id);
    
    const {onBuy,isAlreadyInCart,loading,contextHolder} = useBuy('theme',courseTheme.id,courseTheme.name);

    if(loading) return <Spin/>
    return isAuthed ? <>
                        {contextHolder}
                        <Button disabled={isAlreadyInCart} onClick={onBuy} loading={loading}>
                          {!isAlreadyInCart ? `Купити за ${courseTheme.price} грн.` : 'Тема вже в корзині'}
                        </Button>
                      </>
                    : <Link href={routes.logIn}>Купити за {courseTheme.price} грн.</Link>
}