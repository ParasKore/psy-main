"use client";
// import { Button } from "antd"
import { Modal, Progress, Segmented } from 'antd';
import Questions from './Components/Questions'
import { useEffect, useState } from 'react';
import Footer from "../../Components/Footer";

import Details from './Components/Details';

import { useParams } from 'react-router-dom';
const dataArrayofTests = [
    {
        id: 'HAMA',
        title: 'Hamilton Anxiety Rating Scale (HAM-A)',
        optionCount: 5,

        sectionGuide: "<b>0:</b> Not present, <b>1:</b> Mild, <b>2:</b> Moderate, <b>3:</b> Severe, <b>4:</b> Very severe.",
        ques: [
            "Anxious mood: Worries, anticipation of the worst, fearful anticipation, irritability",
            "Tension: Feelings of tension, fatigability, startle response, moved to tears easily, trembling, feelings of restlessness, inability to relax.",
            "Fears: Of dark, of strangers, of being left alone, of animals, of traffic, of crowds.",

        ],
        rating: {

        }
    },
    {
        id: 'DAS21',
        title: 'DASS 21',
        optionCount: 4,
        sectionGuide: "The rating scale is as follows: Did not apply to me at all, 1 = Applied to me to some degree or some of the time, 2: Applied to me to a considerable degree or a good part of time, 3: Applied to me very much or most of the time",
        ques: [
            "I found it hard to wind down",
            "I was aware of dryness of my mouth",
            "I couldn’t seem to experience any positive feeling at all",
            "I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion)",


        ]
    },
]

const dataIGotfromBackend = [
    {
        scaleId: 'sdz7cczx',
        "PtName": "Atharva Arbat",
        "Dob": "2005-12-12",
        "Doa": "2005-12-12",
        "Gender": "Male"
    },
    {
        "input1": 4,
        "input2": 4,
        "input3": 4
    },
    {
        "input1": 3,
        "input2": 3,
        "input3": 3,
        "input4": 3
    }
]


export default function Scales() {
    //Use this to scaleID to fetch from data of that scale form API
    const { scaleId } = useParams()
    //And so I got an array of data of this particular scale in a const dataIGotfromBackend
    const scaleData = dataIGotfromBackend

    var PtDetailsofSavedScale;
    useEffect(() => {

        var JsonAlreadySavedData = scaleData
        ClearStorage()
        
        if (JsonAlreadySavedData) {
            localStorage.setItem('PtDetails', '')
            PtDetailsofSavedScale = JsonAlreadySavedData[0]
            localStorage.setItem('PtDetails', JSON.stringify(PtDetailsofSavedScale))
            JsonAlreadySavedData.shift()
            JsonAlreadySavedData.map((item, index) => {
                localStorage.setItem(`tempDataofsec${dataArrayofTests[index].id}`, JSON.stringify(item))
            })
        }

    }, [])

    const [dataToSend, setDataToSend] = useState([])
    const handelSave = () => {
        const strgetPtdetails = localStorage.getItem('PtDetails')
        var getPtdetails = {}
        if (strgetPtdetails) {
            getPtdetails = JSON.parse(strgetPtdetails)
        }


        setDataToSend([])
        dataArrayofTests.map((items) => {
            const secWiseData = localStorage.getItem(`tempDataofsec${items.id}`)
            if (secWiseData) {
                setDataToSend((prevValues) => ([
                    ...prevValues,
                    JSON.parse(secWiseData)
                ]))
            }
        })
        setDataToSend((prevValues) => ([
            getPtdetails,
            ...prevValues

        ]))
        ClearStorage()






    }
    const ClearStorage = () => {
        //Clear local storage
        dataArrayofTests.map((items) => {
            localStorage.setItem(`tempDataofsec${items.id}`, '')
            localStorage.setItem(`scoreofsec${items.id}`, '')
        })
        localStorage.setItem('PtDetails', '')
    }
    useEffect(() => {
        localStorage.setItem('dataToSend', JSON.stringify(dataToSend))
    }, [dataToSend])
    const handelGetResult = () => {
        setIsModalOpen(true);
        console.log(dataToSend)
    }
    //calculation of total score
    const [totalScore, setTotalScore] = useState(0)
    dataArrayofTests.map((items) => {
        const getSecScore = Number(localStorage.getItem(`scoreofsec${items.id}`))
        // console.log(getSecScore)
        const currentTotalScore = totalScore + getSecScore



    })

    //Modal related functions
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleModalCancel = () => {
        setIsModalOpen(false);
    };


    //Test Logics here 
    const [testtoShow, setTesttoShow] = useState(-1)
    const handelOpenATest = (index) => {
        setTesttoShow(index)
    }
    const handelCloseTest = () => {
        setTesttoShow(-1)
    }

    //result Modal tab related functions
    const [valueOfTab, setValueOfTab] = useState('Section Wise');
    return (
        <>
            

            <Modal className=''
                title="Scales Report" open={isModalOpen} onOk={handleOk} onCancel={handleModalCancel}
                footer={[
                    <button onClick={handelSave}
                        className='border-[3px] border-gray-800 text-gray-800  hover:bg-gray-800 hover:text-white px-5 py-2 rounded-[16px]'>
                        Download</button>
                    ,
                ]}>
                <div className=''>
                    <Segmented className='w-fit' options={['Section Wise', 'Total Score']}
                        value={valueOfTab} onChange={setValueOfTab} size='large' />
                    {(valueOfTab == 'Section Wise') ?
                        <div className='h-[70vh] overflow-y-auto p-2'>

                            {
                                dataArrayofTests.map((items, index) => {
                                    const getSecScore = localStorage.getItem(`scoreofsec${items.id}`)

                                    const percentScore = Math.round(getSecScore / (items.optionCount * items.ques.length) * 100)
                                    return (
                                        <div key={index} className='my-4'>
                                            <div className='flex w-full justify-between text-lg'><span>{items.title}</span>
                                                <p className='font-bold w-20 bg-gray-100 p-2 rounded-lg h-fit text-center'>{getSecScore} / {((items.optionCount - 1) * items.ques.length)}</p></div>

                                            {/* <Progress className='my-3' type="dashboard" status='active' percent={percentScore} /> */}

                                            <hr />
                                        </div>
                                    )
                                })
                            }
                        </div> :
                        ((valueOfTab == 'Total Score') ?
                            <div className='h-[70vh] overflow-y-auto p-2 transition-all	'>


                                <div>{totalScore}</div>
                            </div> : null

                        )

                    }




                </div>
            </Modal>




            <div className="relative h-[90vh] ">
                <div className='flex justify-end gap-2 m-3'>


                    <button onClick={handelSave}
                        className='border-[3px] border-gray-800 text-gray-800  hover:bg-gray-800 hover:text-white px-5 py-2 rounded-[16px]'>Save</button>


                    <button onClick={handelGetResult}
                        className='border-[3px] border-gray-800 text-gray-800  hover:bg-gray-800 hover:text-white px-5 py-2 rounded-[16px]'>Get Result</button>
                </div>

                <div className='rounde-lg m-3 rounded-lg' >
                    {/* <Accordion collapseAll={true} className='rounde-lg' iconPosition="left" >
                        <Accordion.Panel className='rounde-lg' >
                            <Accordion.Title className='hover:bg-gray-100 text-gray-800 font-semibold'>
                                {dataArrayofTests[0].title}
                            </Accordion.Title>
                            <hr />
                            <Accordion.Content className=''>
                                <div><Questions data={dataArrayofTests[0]} /></div>
                            </Accordion.Content>
                        </Accordion.Panel>
                        <hr />
                        <Accordion.Panel id='34'>
                            <Accordion.Title className='hover:bg-gray-100 text-gray-800 font-semibold'>
                                {dataArrayofTests[1].title}
                            </Accordion.Title>
                            <Accordion.Content>
                                <div><Questions data={dataArrayofTests[1]} /></div>
                            </Accordion.Content>
                        </Accordion.Panel>

                    </Accordion> */}

                    <Details />
                    <p>Select a test</p>
                    <div className='flex flex-wrap gap-2 p-4'>

                        {
                            dataArrayofTests.map((items, index) => {
                                return (

                                    <div key={index}
                                        id={index}
                                        name={index}
                                        onClick={(e) => handelOpenATest(index)}
                                        className='hover:bg-gray-300 bg-gray-200 p-3 rounded border w-[200px] cursor-pointer'>
                                        <button

                                        >
                                            <p >
                                                {items.title}
                                            </p>
                                        </button>

                                    </div>
                                )
                            })
                        }
                    </div>


                </div>

                {
                    testtoShow == -1 ?
                        <></>
                        :
                        <div className='absolute top-0 bg-white w-full h-full border p-2 '>
                            <div className='flex gap-2'>
                                <button onClick={handelCloseTest}>Close</button>
                                <p>
                                    {dataArrayofTests[testtoShow].title}
                                </p>


                            </div>
                            <div className='p-3 h-full overflow-y-auto'>
                                <Questions data={dataArrayofTests[testtoShow]} />
                            </div>
                        </div>


                }

            </div>

           
        </>
    )
}


// export const getSavedScaleData = async()=>{
//     const response = await fetch('https://api.github.com/users/atharvaarbat')
//     console.log(response.json())
//     return response.json()
// }