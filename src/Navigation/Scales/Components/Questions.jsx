import { Progress, Radio } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import {  Statistic } from 'antd';
export default function Questions(props) {
    const quesArray = props.data.ques

    const optCount = props.data.optionCount
    const secGuide = props.data.sectionGuide
    const secID = props.data.id
    const secName = 'sec' + secID
    const [inputValues, setInputValues] = useState({
    });
    useEffect(()=>{
        const savedStringData = localStorage.getItem(`tempDataof${secName}`)
        if (savedStringData){
            setInputValues(JSON.parse(savedStringData))

        }
    }, [])
    //cmds to run on range value change
    const handelInputChange = useCallback((inputName, value) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [inputName]: value,

        }))

    }, [setInputValues]);


    // To track progress
    const quesAttempted = Object.keys(inputValues).length
    const percentageQAtte = Math.round(quesAttempted / quesArray.length * 100)


    //to calucalate score of section
    const [totalSum, setTotalSum] = useState(0)
    // runs few cmds when inputValues is changed
    useEffect(() => {
        //saves changed data to local strg
        const inputValuesString = JSON.stringify(inputValues)
        localStorage.setItem(`tempDataof${secName}`, inputValuesString)

        //cmds for score calc
        let sum = 0;

        for (let key in inputValues) {
            if (inputValues.hasOwnProperty(key)) {
                sum += parseInt(inputValues[key]);
            }
        }
        setTotalSum(sum);
        // saving the score to localstorage
        localStorage.setItem(`scoreof${secName}`, sum)
        // const getTotalLS = Number(localStorage.getItem('totalScore'))

    }, [inputValues, secName, setTotalSum])



    return (
        <div>



            <div className='flex gap-3 w-full justify-between my-2'>
                <div className='self-center p-3 w-full'>
                    <p>Progress </p>
                    <Progress percent={percentageQAtte} size="large" />

                </div>
                <Statistic className='self-center w-[120px] bg-gray-100 p-2 rounded-lg' title="Score" value={totalSum} suffix={`/` + quesArray.length * (optCount - 1)} />

            </div>

            <div className='text-md p-3 bg-gray-100 rounded' dangerouslySetInnerHTML={{ __html: secGuide }} />
            <hr className='mb-2' />
            {
                quesArray.map((items, index) => {
                    const inputName = `input${index + 1}`
                    return (
                        <div key={inputName} className='mb-7 text-lg border p-2 rounded'>
                            <p className='mb-4'><span className='font-semibold'>Q.{index + 1 + ". "}</span>{items}</p>


                            {/* <Row className='m-3 w-full'>
                                <Col span={18}>
                                    <input className='answerRange' type="range" min='0' max={optCount} name="" id={index}
                                        value={inputValues[inputName]}
                                        onChange={(e) => handelInputChange(inputName, e.target.value)} />
                                </Col>
                                <Col span={3}>
                                    <p className='text-lg border rounded font-semibold text-center'>{inputValues[inputName]}</p>
                                </Col>
                            </Row> */}
                            <Radio.Group
                                onChange={(e) => handelInputChange(inputName, e.target.value)}
                                value={inputValues[inputName]}
                            >
                                <div className='flex justify-between'>
                                {Array.from({ length: optCount }).map((_, optionIndex) => (
                                    
                                        <Radio key={optionIndex} value={optionIndex}>
                                            {optionIndex}
                                        </Radio>
                                    

                                ))}</div>
                            </Radio.Group>
                        </div>

                    )


                })
            }
        </div>
    )
}