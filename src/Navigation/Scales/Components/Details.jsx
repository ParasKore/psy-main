

import { useEffect, useState } from 'react';

const PtDetails = {
    
    PtName: '',
    Dob: '',
    Doa: '',
    Gender: '',
}

export default function Details(){
    
    const [ptDetails, setPtDetals] = useState({
        
        
    })
    useEffect(() => {
        setTimeout(()=>{
            const stringPtDetails = localStorage.getItem('PtDetails')
            if(stringPtDetails){
                setPtDetals(JSON.parse(stringPtDetails))
                
                
            }
        },200)
        
        
        
    },[])
    // const titleChange = (e) => {
    //     setPtDetals((prevValues) => ({
    //         ...prevValues,
    //         title: e,
    //     }))
    // }
    const ptNameChange = (e) => {
        setPtDetals((prevValues) => ({
            ...prevValues,
            PtName: e,
        }))
    }
    const DOAChange = (e) => {
        setPtDetals((prevValues) => ({
            ...prevValues,
            Doa: e,
        }))
    }
    const DOBChange = (e) => {
        setPtDetals((prevValues) => ({
            ...prevValues,
            Dob: e,
        }))
    }
    const GenderChange = (e) => {
        setPtDetals((prevValues) => ({
            ...prevValues,
            Gender: e,
        }))
    }
    useEffect(() => {
        
        localStorage.setItem('PtDetails', JSON.stringify(ptDetails))
    }, [ptDetails])
    const handelSave = () => {
        //The ptDetail Object will be saved to Database
    }
    return(
        <div className="border p-4">
            <div className='flex flex-col gap-4'>
                {/* <input className='border p-2' onChange={(e) => titleChange(e.target.value)} value={ptDetails.title}  type="text" placeholder='Untitled Scale'/> */}
                <input className='border p-2' onChange={(e) => ptNameChange(e.target.value)} value={ptDetails.PtName}  type="text" placeholder='Patient Name'/>
                Date of Assessment
                <input className='border p-2' onChange={(e) => DOAChange(e.target.value)} value={ptDetails.Doa} type='date' placeholder='Date of Birth'/>
                Date of Birth
                <input className='border p-2' onChange={(e) => DOBChange(e.target.value)} value={ptDetails.Dob} type='date' placeholder='Date of Birth'/>

                <select onChange={(e) => GenderChange(e.target.value)} value={ptDetails.Gender} className='border p-2' name="" id="">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            
        </div>
    )
}