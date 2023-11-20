import { TestProductT } from "@/types/testProduct"
import Link from "next/link"
import React from "react"

type Props = {
    test?:TestProductT
}

export const FreeTestItemComponent:React.FC<Props> = ({test}) => {
    return <div className="flex flex-col gap-10 m-10">
        <div className="flex flex-col">
            <h1>{test?.name}</h1>
        </div>
        <div className="flex flex-col gap-10">
            {test?.tests.map((test,i) => <div className="flex gap-5">
                <div>{i + 1 + `)`}<Link target={'_blank'} href={test?.testURL}>{test.name}</Link></div>
            </div>)}
        </div>
        {/* {!!item?.tests?.length && <TestsComponent tests={item?.tests}/>} */}
    </div>
}