'use client'
import { usePurchasedItem } from "@/hooks/purchasedItem";
import { Spin } from "antd";
import ReactPlayer from "react-player";
import './styles.scss';
import { useEffect, useState } from "react";
import { TestT } from "@/types/test";
import { AnswerT } from "@/types/answer";
import { TestsComponent } from "./TestsComponent";
import Link from "next/link";

export const PurchasedItemComponent = () => {
    const {item,loading} = usePurchasedItem();
    console.log(item);

    return <div className="flex flex-col gap-10 m-10">
        <div className="flex flex-col">
            {!loading.courseTheme ? <h1>{item?.name}</h1> : <Spin/>}
        </div>
        <div className="flex flex-col gap-10">
            {item?.videoLessons.map((video,i) => <div className="flex flex-col gap-5" key={video.videoURL}>
                <p>{i + 1 + ') ' + video.name}</p>
                {/* <ReactPlayer className={'youtube__container'} url={video.videoURL} controls={true}/> */}
                <div dangerouslySetInnerHTML={{__html:video.videoURL}}/>
                <p>{video.description}</p>
            </div>)}
        </div>
        <div className="flex flex-col gap-10">
             {item?.tests.map((test,i) => <div className="flex gap-5">
                <div>{i + 1 + `)`}<Link target={'_blank'} href={test?.testURL}>{test.name}</Link></div>
            </div>)}
        </div>
        <div className="flex flex-col gap-10">
             {item?.studyMaterials.map((studyMaterial,i) => <div className="flex gap-5">
                <div>{i + 1 + `)`}<Link target={'_blank'} href={studyMaterial?.studyMaterialURL}>{studyMaterial.name}</Link></div>
            </div>)}
        </div>
        {/* {!!item?.tests?.length && <TestsComponent tests={item?.tests}/>} */}
    </div>
}

