import { Cross, MessageCirclePlus, Search, Settings, X } from 'lucide-react'
import React, { useState } from 'react'

const Chats = () => {
    const ChatData= [{username:'Dhruv',userid:'@dhruvgehlot',status:'Active Now',recentmsg:'Hello'},{username:'Uday Kiran',userid:'@udaykiran',status:'3h ago',recentmsg:'Hello'},{username:'Dhruv',userid:'@dhruvgehlot',status:'Active Now',recentmsg:'Hello'},{username:'Uday Kiran',userid:'@udaykiran',status:'3h ago',recentmsg:'Hello'},{username:'Dhruv',userid:'@dhruvgehlot',status:'Active Now',recentmsg:'Hello'},{username:'Uday Kiran',userid:'@udaykiran',status:'3h ago',recentmsg:'Hello'},{username:'Dhruv',userid:'@dhruvgehlot',status:'Active Now',recentmsg:'Hello'},{username:'Uday Kiran',userid:'@udaykiran',status:'3h ago',recentmsg:'Hello'},{username:'Uday Kiran',userid:'@udaykiran',status:'3h ago',recentmsg:'Hello'},{username:'Uday Kiran',userid:'@udaykiran',status:'3h ago',recentmsg:'Hello'}] 
    const [activeItem, setActiveItem] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const clearInput = () => {
      setInputValue('');
    };


  return (
    <div className=' flex flex-col items-start justify-start h-full w-full border  '>
        <div className='flex flex-row items-center justify-center  p-5   ' >
<h1 className='text-2xl font-medium  '>Messages</h1>
<Settings className='ml-72 cursor-pointer ' />
<MessageCirclePlus  className='ml-6 cursor-pointer '/>
        </div>
        <div className='px-10  pt-3 flex flex-row items-center justify-center '>
        <Search className=' absolute -ml-96' />
            <input value={inputValue}
        onChange={handleInputChange}   type="text" placeholder='Search Direct Messages' className='w-[452px] h-[44px] rounded-3xl outline-none border border-gray-800 px-14   text-sm ' />
        {inputValue && (
        <button onClick={clearInput}>
          <X className='-ml-10' />
        </button>
      )}
            
        </div>
        <div  className='flex flex-col items-center justify-center pt-52 h-[1700px] overflow-y-auto   ' >
            {/* {ChatData.map((user,index)=><Subchat item={user} key={index.id} />)} */}
        {ChatData.map((item,index)=>{
            let isActive = index === activeItem ; 
            const bgColor = isActive ? 'bg-[#F7FBE6]  border-r-4 border-[#C0DB27]' : '';
           return(
            <div className={` cursor-pointer flex flex-row items-start justify-start w-[530px] h-[76px]   p-4
             mt-1  ${bgColor}` }
             onClick={()=>setActiveItem(index)} >
                <div  className=' flex items-center justify-center h-[40px] w-[40px] rounded-full border  '
                >
 
                </div>
                <div className='flex flex-col  px-5 '>
                <div className='flex flex-row '>
                <h1 className='text-sm font-semibold '>{item.username}</h1>
                <h3 className='text-xs px-5 mt-1  '>{item.userid}</h3>
                <h3 className='text-xs mt-1 '>.{item.status}</h3>
                </div>
                <h2 className='text-xs'>{item.recentmsg}..</h2>
                <subchat/>
                </div>
            </div>
           )
        })}
        </div>
        </div>
  )
}

export default Chats

//  const Subchat =({item,key})=>{
//     const [activeItem, setActiveItem] = useState(null);

//   const handleClick = () => {
//     setActiveItem(key);
//   };

//   const isActive = key === activeItem;
//   const bgColor = isActive ? 'bg-yellow-500' : '';
//     return(
//         <div  className={` cursor-pointer flex flex-row items-start justify-start w-[530px] h-[76px]   p-4
//         mt-1  ${bgColor}` }
//         // onClick={()=>setactiveItem(key)} 
//         onClick={handleClick}
//         >
//            <div  className=' flex items-center justify-center h-[40px] w-[40px] rounded-full border  '
//            >
//            </div>
//            <div className='flex flex-col  px-5 '>
//            <div className='flex flex-row '>
//            <h1 className='text-sm font-semibold '>{item.username}</h1>
//            <h3 className='text-xs px-5 mt-1  '>{item.userid}</h3>
//            <h3 className='text-xs mt-1 '>.{item.status}</h3>
//            </div>
//            <h2 className='text-xs'>{item.recentmsg}..</h2>
//            <subchat/>
//            </div>
//        </div>
//     )
//  }

 