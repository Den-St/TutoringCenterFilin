import { getCourseThemeById } from "@/firebase/db/courseThemes/get/getCourseThemeById";
import { getStudyMaterialById } from "@/firebase/db/studyMaterials/get/getStudyMaterialById";
import { CartItemTypeT } from "@/types/cartItem";
import { CourseThemeT } from "@/types/courseThemes";
import { StudyMaterialT } from "@/types/studyMaterial";


export const getRealItemByProducIdFunctions:Record<CartItemTypeT,
                ((id: string) => Promise<CourseThemeT | undefined>) | 
                ((id: string) => Promise<StudyMaterialT | undefined>) > = {
    'theme': getCourseThemeById,
    'studyMaterial':getStudyMaterialById
}