import React from "react";
import Chats from "./Chats";
import Chat from "./Chat";

const Messages = () => {
  return (
    
      <div className="h-full  w-full  flex flex-row  ">
            <div className=" ">
         <Chats/>       
        </div>
        <div className="h-full w-full ">
        <Chat/>
        </div>
      </div>
   
  );
};

export default Messages;
