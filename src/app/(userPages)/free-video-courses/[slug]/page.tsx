
import { useParams } from "next/navigation";
import {CourseT} from '@/types/course';
import { getCourses } from "@/firebase/db/courses/get/getCourses";
import { VideoCourseItemComponent } from "@/components/VideoCourses";
import { getCourseById } from "@/firebase/db/courses/get/getCourseById";
import { getCourseThemesByCourseId } from "@/firebase/db/courseThemes/get/getCourseThemesByCourseId";
import { getFreeCourseThemes } from "@/firebase/db/courseThemes/get/getFreeCourseThemes";
import { getCourseThemeById } from "@/firebase/db/courseThemes/get/getCourseThemeById";
import { FreeVideoCourseComponent } from "@/components/FreeVideoCourseCompoennt";

export async function generateStaticParams() {
    const themes = await getFreeCourseThemes();
    if(!themes) return [{slug:''}];

    return themes.map(theme => ({slug:theme.id}))
}

export default async function FreeVideoCoursePage(params:{params:{slug:string}}) {
    const theme = await getCourseThemeById(params.params.slug);
    
    return <FreeVideoCourseComponent theme={theme}/>
}