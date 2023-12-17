import { routes } from "@/consts/routes"
import { useLessonOrders } from "@/hooks/lessons"
import { LessonStatusesToUA } from "@/types/lessons";
import Link from "next/link"

export const LessonOrdersComponent = () => {
    const {items} = useLessonOrders();

    return <div className="flex flex-col">
        {items.map(item =>
            <div className="flex justify-between">
                <Link href={routes.teacher(item.teacher.id)}>{item.teacher.name + ' ' + item.teacher.surname + ' ' + item.teacher.patronymic}</Link>
                <p>{LessonStatusesToUA[item.status]}</p>
                <p>{item.theme}</p>
                <p>{item.link}</p>
                <p>{item.date?.toDate().toLocaleString()}</p>
                <p>{item.createdAt?.toDate()?.toLocaleString()}</p>
            </div>    
        )}
    </div>
}