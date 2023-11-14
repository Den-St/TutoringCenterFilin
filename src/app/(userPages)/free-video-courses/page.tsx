import { routes } from "@/consts/routes";
import { getFreeCourseThemes } from "@/firebase/db/courseThemes/get/getFreeCourseThemes"
import Link from "next/link";

export const revalidate = 600;

export default async function FreeVideoCourses() {
    const themes = await getFreeCourseThemes();

    return <div className="flex flex-col gap-10">
        {themes?.map(theme => <Link className="p-5 flex justify-between items-center border-black border-2" href={routes.freeVideoCourseItem(theme.id)} >{theme.name}</Link>)}
    </div>
}