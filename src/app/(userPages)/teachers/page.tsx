import { routes } from "@/consts/routes";
import { getTeachers } from "@/firebase/db/users/get/getTeachers";
import Link from "next/link";

export default async function Teachers() {
    const teachers = await getTeachers();
    
    return <div className="flex flex-col">
        {teachers.map(teacher => 
            <Link href={routes.teacher(teacher.id)} key={teacher.id} className="p-5 border-black border-2">
                <img src={teacher.photoURL}/>
                <p>{teacher.name + ' ' + teacher.surname + ' ' + teacher.patronymic}</p>
                <p>{teacher?.teacherInfo?.aboutMe}</p>
                <div className="flex flex-col gap-1">
                    {teacher?.teacherInfo?.subjects.map(subject => <p key={subject.id}>{subject.name}</p>)}
                </div>
            </Link>    
        )}
    </div>
}