import { TestProductT } from '@/types/testProduct';
import { getCourseThemeById } from "@/firebase/db/courseThemes/get/getCourseThemeById";
import { getStudyMaterialById } from "@/firebase/db/studyMaterials/get/getStudyMaterialById";
import { CartItemTypeT } from "@/types/cartItem";
import { CourseThemeT } from "@/types/courseThemes";
import { StudyMaterialT } from "@/types/studyMaterial";
import { getTestById } from '@/firebase/db/tests/get/getTestById';


export const getRealItemByProducIdFunctions:Record<CartItemTypeT,
                ((id: string) => Promise<CourseThemeT | undefined>) | 
                ((id: string) => Promise<StudyMaterialT | undefined>) |
                ((id: string) => Promise<TestProductT | undefined>)> = {
    'theme': getCourseThemeById,
    'studyMaterial':getStudyMaterialById,
    'test':getTestById
}