import React, { Component } from "react";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { Input } from "react-chat-elements";
import { InfoIcon, SendHorizontal, X } from "lucide-react";

const Chat = () => {
  const freinddata = [
    {
      username: "Dhruv Gehlot",
      userid: "@Dhruv",
      userdesig: "MD Psychiatrist @AnandaCare, 🧘‍♂️ Mindfulness Coach",
      userinfo: "Joined May 2017 · 6.5K Followers",
    },
  ];

  const chatdata = [
    { msg: "non odit iste rerum quisquam. Cum accusant", Sender },
    { msg: "non odit iste rerum quisquam. Cum accusant", Receiver },
    { msg: "non odit iste rerum quisquam. Cum accusant", Sender },
    { msg: "non odit iste rerum quisquam. Cum accusant", Receiver },
    { msg: "non odit iste rerum quisquam. Cum accusant", Sender },
    { msg: "non odit iste rerum quisquam. Cum accusant", Receiver },
  ];

  const user = Receiver;

  return (
    <div className="px-2">
                <div className="flex flex-row items-center justify-start p-4 gap-3">
                  <div className="hover:bg-gray-200 rounded-full p-2 ">
                  <X className="cursor-pointer "/>
                  </div>
       <h1 className="font-semibold text-[20px] ">Dhruv Gehlot</h1>
       <InfoIcon className="ml-96 cursor-pointer" />
       </div>
      <div className="overflow-y-auto h-[600px] pb-10">
        <div className="flex flex-col items-center justify-center  ">
           
          
          
          <div className="flex flex-col items-center justify-center pt-9 ">
            <div className="h-[60px] w-[60px] rounded-full border "></div>
            <h1 className="text-xl font-medium pt-4 ">Dhruv Gehlot</h1>
            <h1 className="text-gray-500 text-sm">@Dhruv</h1>
            <h1 className="pt-2">
              MD Psychiatrist @AnandaCare, 🧘‍♂️ Mindfulness Coach
            </h1>
            <h1 className="text-gray-500 text-base pb-5 ">
              Joined May 2017 · 6.5K Followers
            </h1>
          </div>
        </div>
        <div className="flex flex-col  pt-[27%]  ">
          {chatdata.map((chat, index) => {
            return (
              <div>
                {/* { user === Sender ? ( <div className='' >
    <Sender user={item} key={index} />
    </div>) : null }
    {user === Receiver ? (<div className='' >
    <Receiver user1={item} key1={index}  />
    </div>) : null  } */}
                {chat.Sender ? (
                  <div>
                    <Sender key={index} msg={chat.msg} />
                  </div>
                ) : null}{" "}
                {chat.Receiver ? (
                  <div>
                    <Receiver key={index} msg={chat.msg} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex bg-gray-200 items-center w-full p-1 gap-2 rounded-full pl-4 ">
        <input
          type="text"
          placeholder="Enter Your Message Here"
          className="p-2 flex flex-1 outline-none bg-gray-200 "
        />
        <div className="rounded-[50%] p-2 hover:bg-gray-300">
        <SendHorizontal
          style={{ color: "#C0DB27" }}
          className=" cursor-pointer  "
        />
        </div>
        </div>
    </div>
  );
};

export default Chat;

const Sender = ({  }) => {
  return (
    <div className="">
      <div
        style={{ backgroundColor: "#C0DB27" }}
        className="w-[319px] p-4 rounded-s-xl  rounded-br-xl  text-white ml-80"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iste hic
        eum, at reiciendis
      </div>
      <h1 className="text-gray-500 pt-1 ml-80 ">Just Now</h1>
    </div>
  );
};

const Receiver = () => {
  return (
    <div className="flex flex-row items-start justify-start px-10 ">
      <div className="h-[40px] w-[40px] rounded-full border mr-3 "></div>
      <div className="flex flex-col ">
        <h1 className="font-semibold">Dhruv Gehlot</h1>
        <div className="w-[319px] p-4 rounded-xl  text-black bg-gray-200 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
        <h1 className="text-gray-500 pt-1  ">18:00 PM</h1>
      </div>
    </div>
  );
};
