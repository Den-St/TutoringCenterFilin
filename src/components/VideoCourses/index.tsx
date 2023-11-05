import { CourseT } from "@/types/course"
import { CourseThemeT } from "@/types/courseThemes"
import React from "react"
import { BuyVideoCourseButton } from "./BuyVideoCourseButton"

type Props = {
    course?:CourseT,
    themes?:CourseThemeT[]
}

export const VideoCourseItemComponent:React.FC<Props> = ({course,themes}) => {
    return <div className="flex flex-col gap-4 items-center">
        <p>{course?.shortName}</p>
        <p>{course?.description}</p>
        {themes?.map(theme => 
        <p key={theme.id} className="w-full border-4 border-solid border-black p-4">
            {theme.name}
            <BuyVideoCourseButton courseTheme={{...theme,createdAt:null}}/>
        </p>)}
    </div>
}