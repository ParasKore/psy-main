"use client";
// import { Button } from "antd"
import { Modal, Progress, Segmented, Card } from 'antd';

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext'
import Footer from "../../Components/Footer";



import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';

const savedScales = [
  [
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
  ],
  [
    {
      scaleId: 'dscsfccx',
      "PtName": "Dhruv Ds",
      "Dob": "2005-12-12",
      "Doa": "2005-12-12",
      "Gender": "Male"
    },
    {
      "input1": 1,
      "input2": 1,
      "input3": 1
    },
    {
      "input1": 1,
      "input2": 1,
      "input3": 1,
      "input4": 1
    }
  ]
]


export default function Scales() {
  const {isLoggedIn, setisLoggedIn} = useContext(UserContext)
  const navigate  = useNavigate();
  useEffect(()=>{
    localStorage.clear()
      // if(!isLoggedIn){
      //     navigate('/login')
      // }
  },[])
  




  return (
    <>
      






      <div className="relative">
        <a className='h-fit' href="/new-scale"><button className="bg-zinc-900 text-white px-10 p-3 rounded-[14px]">New Scale</button></a>

        <div className='rounde-lg m-3 rounded-lg border flex flex-wrap' >
          {
            savedScales.map((item, index) => {
              return (
                <Link key={index} to={`/new-scale/${item[0].scaleId}`}
                  // onClick={() => {
                  //   localStorage.setItem('currentScale', JSON.stringify(item))
                  //   console.log(index)
                  // }}
                  >
                  
                  <Card title={item[0].PtName} 
                  bordered={true} style={{ width: 200 }}>
                    <p>{item[0].scaleId}</p>
                    <p>{item[0].Doa}</p>
                    <p>{item[0].Dob}</p>
                    <p>{item[0].Gender}</p>
                  </Card>
                  </Link>

              )

            })
          }

        </div>
      </div>
      
    </>
  )
}