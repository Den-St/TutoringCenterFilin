import { AboutUsSectionT } from "@/types/aboutUsSection"
import React from "react"
import './aboutUsItemStyles.scss';

type Props = {
    aboutUsSection?:AboutUsSectionT
}

export const AboutUsItemComponent:React.FC<Props> = ({aboutUsSection}) => {

    return <div className="aboutUsItemComponent__container" dangerouslySetInnerHTML={{__html:aboutUsSection?.text || ''}}/>;
}