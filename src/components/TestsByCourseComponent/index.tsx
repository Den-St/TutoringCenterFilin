import { CourseT } from "@/types/course"
import { TestProductT } from "@/types/testProduct"
import Link from "next/link"
import { BuyProductButton } from "../BuyVideoCourseButton"

type Props = {
    course?:CourseT 
    tests?:TestProductT[]
}

export const TestsByCourseComponent:React.FC<Props> = ({course,tests}) => {
    return <div>
        <p>{course?.shortName}</p>
        <p>{course?.description}</p>
        {tests?.map(test => 
            <div className="w-full border-4 border-solid border-black p-4 flex flex-col">
                <p key={test.id} className="flex justify-between items-center">
                    {test.name}
                    <BuyProductButton productType={'test'} product={{...test,createdAt:null}}/>
                </p>
                <div className="flex flex-col gap-2">
                    {test.tests.map((test,i) => test.isFree 
                        ? <Link target={'_blank'} className="text-green-600" href={test.testURL}>{i + 1 + ') ' + test.name}</Link>
                        : <p>{i + 1 + ') ' + test.name}</p>
                    )}
                </div>
            </div>
        )}
    </div>
}