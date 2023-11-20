import { ReviewForm } from "@/components/TeacherProfile/ReviewForm";
import { getTeacherReviewsByTeacherId } from "@/firebase/db/teacherReview/get/getByTeacherId";
import { getTeacherById } from "@/firebase/db/users/get/getTeacherById";
import { getTeachers } from "@/firebase/db/users/get/getTeachers";

export async function generateStaticParams() {
    const items = await getTeachers();

    return items.map(item => ({slug:item.id}))
}

export default async function TeacherItemPage(params:{params:{slug:string}}) {
    const [teacher,reviews] = await Promise.all([await getTeacherById(params.params.slug),await getTeacherReviewsByTeacherId(params.params.slug)]);
    
    return <div className="p-5 border-black border-2 flex flex-col">
         <div key={teacher?.id} className="p-5 border-black border-2">
            <img src={teacher?.photoURL}/>
            <p>{teacher?.name + ' ' + teacher?.surname + ' ' + teacher?.patronymic}</p>
            <p>{teacher?.teacherInfo?.aboutMe}</p>
            <div className="flex flex-col gap-1">
                {teacher?.teacherInfo?.subjects.map(subject => <p key={subject.id}>{subject.name}</p>)}
            </div>
        </div>   
        <ReviewForm/>
        <div className="flex flex-col gap-5">
            {reviews.map(review => <div className="border-black border-2" key={review.id}>
                <p>{review.authorName}</p>
                <p>{review.text}</p>
                <p>{review.createdAt?.toDate()?.toLocaleString()}</p>
            </div>)}
        </div>
    </div>
}