import { TeacherItemComponent } from "@/components/TeacherItem";
import { getTeachers } from "@/firebase/db/users/get/getTeachers";

export default async function Teachers() {
    const teachers = await getTeachers();
    
    return <div className="flex flex-col">
        {teachers.map(teacher => 
            <TeacherItemComponent teacher={teacher}/>  
        )}
    </div>
}