import { FreeTestItemComponent } from "@/components/FreeTestsComponent/FreeTestItemComponent";
import { getFreeTests } from "@/firebase/db/tests/get/getFreeTests";
import { getTestById } from "@/firebase/db/tests/get/getTestById";

export async function generateStaticParams() {
    const items = await getFreeTests();

    return items.map(item => ({slug:item.id}))
}

export default async function FreeTestItemPage(params:{params:{slug:string}}) {
    const test = await getTestById(params.params.slug);

    return <FreeTestItemComponent test={test}/>
}