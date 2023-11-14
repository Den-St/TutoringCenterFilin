'use client'
import { routes } from "@/consts/routes";
import { useAppSelector } from "@/hooks/redux"
import { useBuy } from "@/hooks/useBuy";
import { CourseT } from "@/types/course";
import { CourseThemeT } from "@/types/courseThemes";
import { StudyMaterialT } from "@/types/studyMaterial";
import { Button, Spin } from "antd"
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
    studyMaterial:StudyMaterialT,
}

export const BuyStudyMaterialButton:React.FC<Props> = ({studyMaterial}) => {
    const isAuthed = !!useAppSelector(user => user.user.id);
    
    const {onBuy,isAlreadyInCart,loading,contextHolder} = useBuy('studyMaterial',studyMaterial.id,studyMaterial.name);

    if(loading) return <div><Spin/></div>
    return isAuthed ? <>
                        {contextHolder}
                        <Button  disabled={isAlreadyInCart} onClick={onBuy} loading={loading}>
                          {!isAlreadyInCart ? `Купити за ${studyMaterial.price} грн.` : 'Тема вже в корзині'}
                        </Button>
                      </>
                    : <Link href={routes.logIn}>Купити за {studyMaterial.price} грн.</Link>
}