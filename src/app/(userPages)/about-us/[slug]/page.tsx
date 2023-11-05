import { getAllAboutUsSections } from "@/firebase/db/aboutUsSections/get/getAllAboutUsSections";
import { getAboutUsSectionsById } from "@/firebase/db/aboutUsSections/get/getAboutUsSectionsById";
import { AboutUsItemComponent } from "@/components/AboutUsItem";

export async function generateStaticParams() {
    const items = await getAllAboutUsSections();

    return items.map(item => ({slug:item.id}))
}

export default async function AboutUsItemPage(params:{params:{slug:string}}) {
    const aboutUsSection = await getAboutUsSectionsById(params.params.slug);

    return <AboutUsItemComponent aboutUsSection={aboutUsSection}/>
}