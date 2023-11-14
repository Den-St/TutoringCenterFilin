import { SSG_STUDY_MATERIALS } from "@/consts/lastStudyMaterialsNumber";
import { getLastFreeStudyMaterials } from "@/firebase/db/studyMaterials/get/getLastStudyMaterials";
import { getStudyMaterialById } from "@/firebase/db/studyMaterials/get/getStudyMaterialById";
import Link from "next/link";

export async function generateStaticParams() {
    const studyMaterials = await getLastFreeStudyMaterials(SSG_STUDY_MATERIALS);
    
    return studyMaterials.map(studyMaterialItem => ({id:studyMaterialItem.id}))
}

export const revalidate = 600;


export default async function FreeStudyMaterialItemPage({params}:{params:{id:string}}) {
    const studyMaterial = await getStudyMaterialById(params.id);

    return <div className="flex flex-col gap-10 m-10">
        <div className="flex flex-col">
            <h1>{studyMaterial?.name}</h1>
        </div>
        <div className="flex flex-col gap-10">
            {studyMaterial?.videoLessons.map((video,i) => <div className="flex flex-col gap-5" key={video.videoURL}>
                <p>{i + 1 + ') ' + video.name}</p>
                {/* <ReactPlayer className={'youtube__container'} url={video.videoURL} controls={true}/> */}
                <div dangerouslySetInnerHTML={{__html:video.videoURL}}/>
                <p>{video.description}</p>
            </div>)}
        </div>
        <div className="flex flex-col gap-10">
            {studyMaterial?.tests.map((test,i) => <div className="flex gap-5">
                <div>{i + 1 + `)`}<Link target={'_blank'} href={test?.testURL}>{test.name}</Link></div>
            </div>)}
        </div>
        <div className="flex flex-col gap-10">
            {studyMaterial?.documents.map((document,i) => <div className="flex gap-5">
                <div>{i + 1 + `)`}<Link target={'_blank'} href={document?.documentURL}>{document.name}</Link></div>
            </div>)}
        </div>
        {/* {!!studyMaterial?.tests?.length && <TestsComponent tests={item?.tests}/>} */}
    </div>
}