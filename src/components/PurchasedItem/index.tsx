import { usePurchasedItem } from "@/hooks/purchasedItem";
import { Spin } from "antd";
import './styles.scss';
import Link from "next/link";
import { CartItemTypeT } from "@/types/cartItem";
import { CourseThemeT } from "@/types/courseThemes";
import { StudyMaterialT } from "@/types/studyMaterial";
import { TestProductT } from "@/types/testProduct";

const CartTypeToPurchasedItem:Record<CartItemTypeT,((item:CourseThemeT) => React.ReactNode) | ((item:StudyMaterialT) => React.ReactNode) | ((item:TestProductT) => React.ReactNode)> = {
    'theme':(item:CourseThemeT) => <div className="flex flex-col gap-10 m-10">
                <div className="flex flex-col">
                    <h1>{item?.name}</h1>
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
                    {item?.documents.map((document,i) => <div className="flex gap-5">
                        <div>{i + 1 + `) `}<Link target={'_blank'} href={document?.documentURL}>{document.name}</Link></div>
                    </div>)}
                </div>
                {/* {!!item?.tests?.length && <TestsComponent tests={item?.tests}/>} */}
            </div>,

    'studyMaterial':(item:StudyMaterialT) => <div className="flex flex-col gap-10 m-10">
            <div className="flex flex-col">
                <h1>{item?.name}</h1>
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
                {item?.documents.map((studyMaterial,i) => <div className="flex gap-5">
                    <div>{i + 1 + `)`}<Link target={'_blank'} href={studyMaterial?.documentURL}>{studyMaterial.name}</Link></div>
                </div>)}
            </div>
            {/* {!!item?.tests?.length && <TestsComponent tests={item?.tests}/>} */}
        </div>,
    'test':(item:TestProductT) => <div className="flex flex-col gap-10 m-10">
            <div className="flex flex-col">
                <h1>{item?.name}</h1>
            </div>
            <div className="flex flex-col gap-10">
                {item?.tests.map((test,i) => <div className="flex gap-5">
                    <div>{i + 1 + `)`}<Link target={'_blank'} href={test?.testURL}>{test.name}</Link></div>
                </div>)}
            </div>
            {/* {!!item?.tests?.length && <TestsComponent tests={item?.tests}/>} */}
        </div>
}

export const PurchasedItemComponent = () => {
    const {item,loading,type} = usePurchasedItem();
    console.log(item)
    if(loading.item || !type || !item?.id) return <Spin/>;

    //@ts-ignore
    return CartTypeToPurchasedItem[type](item);
}

