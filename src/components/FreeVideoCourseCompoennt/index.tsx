import { CourseThemeT } from "@/types/courseThemes"
import Link from "next/link"
import ReactPlayer from "react-player"
import { VideoPlayer } from "./VideoPlayer"

type Props = {
    theme?:CourseThemeT
}

export const FreeVideoCourseComponent:React.FC<Props> = ({theme}) => {
    console.log('the',theme)
    return <div className="flex flex-col gap-10 m-10">
        <div className="flex flex-col">
            <h1>{theme?.name}</h1>
        </div>
        <div className="flex flex-col gap-10">
            {theme?.videoLessons.map((video,i) => <div className="flex flex-col gap-5" key={video.videoURL + i}>
                <p>{i + 1 + ') ' + video.name}</p>
                {/* <VideoPlayer url={video.videoURL}/> */}
                <div dangerouslySetInnerHTML={{__html:video.videoURL}}/>
                {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/lF281tABrHM?si=7KJfBJnKKW4z_s9u" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                <p>{video.description}</p>
            </div>)}
        </div>
        <div className="flex flex-col gap-10">
             {theme?.tests.map((test,i) => <div className="flex gap-5" key={test.testURL + i}>
                <div>{i + 1 + `)`}<Link target={'_blank'} href={test?.testURL}>{test.name}</Link></div>
            </div>)}
        </div>
        <div className="flex flex-col gap-10">
             {theme?.studyMaterials.map((studyMaterial,i) => <div className="flex gap-5" key={studyMaterial.studyMaterialURL + i}>
                <div>{i + 1 + `)`}<Link target={'_blank'} href={studyMaterial?.studyMaterialURL}>{studyMaterial.name}</Link></div>
            </div>)}
        </div>
    </div>
}