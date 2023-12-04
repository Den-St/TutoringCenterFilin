import { routes } from "@/consts/routes"
import { UserT } from "@/types/user"
import Link from "next/link"
import { OrderLessonButton } from "./OrderLessonButton"
type Props = {
    teacher:UserT
}

export const TeacherItemComponent:React.FC<Props> = ({teacher}) => {
    return <div className="p-5 border-black border-2 flex">
        <Link href={routes.teacher(teacher.id)} key={teacher.id} className="p-5 border-black border-2 flex flex-col">
            <img src={teacher.photoURL}/>
            <p>{teacher.name + ' ' + teacher.surname + ' ' + teacher.patronymic}</p>
            <p>{teacher?.teacherInfo?.aboutMe}</p>
            <div className="flex flex-col gap-1">
                {teacher?.teacherInfo?.subjects.map(subject => <p key={subject.id}>{subject.name}</p>)}
            </div>
        </Link> 
        <OrderLessonButton teacherId={teacher.id}/>
    </div> 
}