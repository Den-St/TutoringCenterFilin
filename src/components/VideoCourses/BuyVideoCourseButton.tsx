'use client'
import { routes } from "@/consts/routes";
import { useAppSelector } from "@/hooks/redux"
import { CourseT } from "@/types/course";
import { CourseThemeT } from "@/types/courseThemes";
import { Button, Spin } from "antd"
import Link from "next/link";

type Props = {
    courseTheme:CourseThemeT,
}

export const BuyVideoCourseButton:React.FC<Props> = ({courseTheme}) => {
    const isAuthed = !!useAppSelector(user => user.user.id);
    const onBuy = () => {

    }
    return isAuthed ? <Button>Купити за {courseTheme.price} грн.</Button> 
                    : <Link href={routes.logIn}>Купити за {courseTheme.price} грн.</Link>
}