'use client';
import ReactPlayer from "react-player"
type Props = {
    url:string
}

export const VideoPlayer:React.FC<Props> = ({url}) => {
    return <ReactPlayer url={url}/>
}