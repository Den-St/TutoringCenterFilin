import { TestT } from "@/types/test"
import { Image } from "antd"
import React, { useEffect, useState } from "react"

type Props = {
    tests:TestT[]

}

export const TestsComponent:React.FC<Props> = ({tests}) => {
    const [activeTest,setActiveTest] = useState<TestT | undefined>(tests.find(test => test.number === 1));
    const [chosenAnswers,setChosenAnswers] = useState<Record<number,number>>();//number of test,number of chosen answer of test;
    const [isFinished,setIsFinished] = useState(false);

    const onChooseAnswer = (isChecked:boolean,answerNumber:number) => {
        if(!activeTest) return;

        if(isChecked) setChosenAnswers(prev => ({...prev,[activeTest?.number]:answerNumber}));
    }

    useEffect(() => {
        setActiveTest(tests.find(test => test.number === 1))
    }, [tests]);
    const onFinishTest = () => {
        setIsFinished(true);
    };
    const isCorrectAnswer = (testNumber?:number) => {
        if(!chosenAnswers || !testNumber || !chosenAnswers[testNumber]) return false;
        return tests.find(test => test.number === testNumber)?.answers[chosenAnswers[testNumber]].isCorrect;
    }

    return <div className="flex flex-col gap-10">
        <div className="flex gap-3">
            {!isFinished ? tests.map(test => test.id === activeTest?.id 
                ? <p key={test.id} onClick={() => setActiveTest(test)} className="p-3 cursor-pointer border-black border-2 border-solid bg-slate-400">{test.number}</p>
                : <p key={test.id} onClick={() => setActiveTest(test)} className="p-3 cursor-pointer border-black border-2 border-solid">{test.number}</p>
            ) : tests.map(test => test.id === activeTest?.id 
                ? isCorrectAnswer(test.number) 
                    ? <p key={test.id} onClick={() => setActiveTest(test)} className="p-3 cursor-pointer border-black border-2 border-solid bg-green-900">{test.number}</p>
                    : <p key={test.id} onClick={() => setActiveTest(test)} className="p-3 cursor-pointer border-black border-2 border-solid bg-red-900">{test.number}</p>
                : isCorrectAnswer(test.number) 
                    ? <p key={test.id} onClick={() => setActiveTest(test)} className="p-3 cursor-pointer border-black border-2 border-solid bg-green-400">{test.number}</p>
                    : <p key={test.id} onClick={() => setActiveTest(test)} className="p-3 cursor-pointer border-black border-2 border-solid bg-red-400">{test.number}</p>
            )}
            <button onClick={onFinishTest} className="p-3 border-green border-2 border-solid bg-green-700">Завершити</button>
        </div>
        {activeTest && 
        <div className="flex flex-col gap-3">
            {activeTest?.description}
            <div>{activeTest?.photos.map(photo =>
                    <Image src={photo} style={{'maxWidth':'250px','maxHeight':'250px'}} width={'100px'} />
                )}
            </div>
            {Object.entries(activeTest?.answers || {}).map(
                keyValue => activeTest?.number && !isFinished ? <div key={activeTest?.id+keyValue[0]} className="flex gap-4 items-center">
                    <input disabled={isFinished} checked={chosenAnswers?.[activeTest?.number] === Number(keyValue[0])} type={'radio'} 
                        onChange={(e) => onChooseAnswer(!!e.target.value,+keyValue[0])} 
                        id={activeTest?.id+keyValue[0]} name={activeTest?.id + ' answers'}/>
                        
                    {(+keyValue[0] + 1) +`)`+ ' ' +keyValue[1].text}
                </div> 
                : keyValue[1].isCorrect ? <div key={activeTest?.id+keyValue[0]} className="flex gap-4 items-center bg-green-400">
                    <input disabled={isFinished} checked={chosenAnswers?.[activeTest?.number] === Number(keyValue[0])} type={'radio'} 
                        onChange={(e) => onChooseAnswer(!!e.target.value,+keyValue[0])} 
                        id={activeTest?.id+keyValue[0]} name={activeTest?.id + ' answers'}/>
                        
                    {(+keyValue[0] + 1) +`)`+ ' ' +keyValue[1].text}
                </div> 
                : chosenAnswers?.[activeTest.number] === Number(keyValue[0]) ? <div key={activeTest?.id+keyValue[0]} className="flex gap-4 items-center bg-red-600">
                    <input disabled={isFinished} checked={chosenAnswers?.[activeTest?.number] === Number(keyValue[0])} type={'radio'} 
                        onChange={(e) => onChooseAnswer(!!e.target.value,+keyValue[0])} 
                        id={activeTest?.id+keyValue[0]} name={activeTest?.id + ' answers'}/>
                        
                    {(+keyValue[0] + 1) +`)`+ ' ' +keyValue[1].text}
                </div> 
                : <div key={activeTest?.id+keyValue[0]} className="flex gap-4 items-center">
                    <input className="cursor-pointer" disabled={isFinished} checked={chosenAnswers?.[activeTest?.number] === Number(keyValue[0])} type={'radio'} 
                        onChange={(e) => onChooseAnswer(!!e.target.value,+keyValue[0])} 
                        id={activeTest?.id+keyValue[0]} name={activeTest?.id + ' answers'}/>
                        
                    {(+keyValue[0] + 1) +`)`+ ' ' +keyValue[1].text}
                </div>
            )}
        </div>}
    </div>
}