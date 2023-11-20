// import { getCourseByClassId } from "@/firebase/db/courses/get/getCoursesByClassId";
import { getCourses } from "@/firebase/db/courses/get/getCourses";
import { getCourseById } from "@/firebase/db/courses/get/getCourseById";
import { TestsByCourseComponent } from "@/components/TestsByCourseComponent";
import { getTestsByCourseId } from "@/firebase/db/tests/get/getTestsByCourseThemeId";

export async function generateStaticParams() {
    const courses = await getCourses();

    return courses.map(course => ({slug:course.id}))
}

export default async function TestsByCoursePage(params:{params:{slug:string}}) {
    const [course,tests] = await Promise.all([getCourseById(params.params.slug),await getTestsByCourseId(params.params.slug)]);

    return <TestsByCourseComponent course={course} tests={tests}/>
}