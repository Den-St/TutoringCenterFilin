'use client'

import { routes } from "@/consts/routes"
import { useOrderLesson } from "@/hooks/useOrderLesson"
import { Button } from "antd"
import Link from "antd/es/typography/Link"

type Props = {
    teacherId:string
}

export const OrderLessonButton:React.FC<Props> = ({teacherId}) => {
    const {onOrder,loading,isAlreadyOrdered,userId} = useOrderLesson(teacherId);

    return <>
        {userId 
        ? <Button onClick={onOrder} disabled={isAlreadyOrdered || loading}>{!isAlreadyOrdered ? `Замовити заняття` : `Вже замовлено`}</Button>
        : <Link href={routes.registration}>Зареєструватися</Link>
        }
    </>
}