'use client'
import { usePurchasedItem } from "@/hooks/purchasedItem";
import { Spin } from "antd";
import ReactPlayer from "react-player";
import './styles.scss';
import { useEffect, useState } from "react";
import { TestT } from "@/types/test";
import { AnswerT } from "@/types/answer";
import { TestsComponent } from "./TestsComponent";

export const PurchasedItemComponent = () => {
    const {item,loading} = usePurchasedItem();
        
    return <div className="flex flex-col gap-10 m-10">
        <div className="flex flex-col">
            {!loading.courseTheme ? <h1>{item?.courseTheme.name}</h1> : <Spin/>}
        </div>
        <div className="flex flex-col gap-10">
            {!loading.videos ? item?.videos.map(video => <div className="flex flex-col gap-5" key={video.id}>
                <p>{video.number + ') ' + video.name}</p>
                <ReactPlayer className={'youtube__container'} url={video.videoURL} controls={true}/>
                <p>{video.description}</p>
            </div>) : <Spin/>}
        </div>
        {!!item?.tests?.length && <TestsComponent tests={item?.tests}/>}
    </div>
}

