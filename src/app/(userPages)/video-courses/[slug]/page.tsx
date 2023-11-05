// import { getCourseByClassId } from "@/firebase/db/courses/get/getCoursesByClassId";
import { useParams } from "next/navigation";
import {CourseT} from '@/types/course';
import { getCourses } from "@/firebase/db/courses/get/getCourses";
import { VideoCourseItemComponent } from "@/components/VideoCourses";
import { getCourseById } from "@/firebase/db/courses/get/getCourseById";
import { getCourseThemesByCourseId } from "@/firebase/db/courseThemes/get/getCourseThemesByCourseId";

export async function generateStaticParams() {
    const courses = await getCourses();

    return courses.map(course => ({slug:course.id}))
}

export default async function VideoCourseItemPage(params:{params:{slug:string}}) {
    const [course,themes] = await Promise.all([getCourseById(params.params.slug),await getCourseThemesByCourseId(params.params.slug)]);

    return <VideoCourseItemComponent course={course} themes={themes}/>
}