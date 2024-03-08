import React, { useEffect, useState } from "react";
//Router
import { useNavigate, NavLink,useLocation } from "react-router-dom";
//Assets
import Logo from "../../Assets/images/logo-full.png";
// Utility Functions
import GetUser from "../../lib/get-data";
import { PostApi } from "../../lib/axios-api";
import Suggestions from "./Suggestions";

function Header() {
  const user = GetUser();
  const [notifications, setNotifications] = useState(0);


  const getNotificationsCount = async () => {
    const res = await PostApi("notifications-count");

    if (res && res.message == "notifications") {
      setNotifications(res.data);
    }

    console.log("res", res);
  };

  useEffect(() => {
    if (user != null) {
      getNotificationsCount();
    }
  }, [user]);

  return (
    
    <>
      {/* Mobile View */}
      
      <div className="sm:hidden z-10 header w-full bg-white  flex justify-between border">
        <div className="flex gap-4 pl-4 items-center">
          <NavLink to="/">
            <img width="170px" src={Logo} alt="" />
          </NavLink>
        </div>
        <div className="flex gap-4 p-3 ">
          {/* <a className='h-fit' href="/new-scale"><button className="bg-zinc-900 text-white px-10 p-4 rounded-[18px]">New Scale</button></a> */}
          <a className="flex items-center" href="/notifications">
            <button className="relative h-fit self-center">
              {/* <IoIosNotificationsOutline size="40px" /> */}
              <svg
                width="45"
                height="45"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_16_3380)">
                  <rect
                    x="0.153809"
                    y="0.400024"
                    width="27.2"
                    height="27.2"
                    rx="13.6"
                    fill="#E9E9E9"
                  />
                  <path
                    d="M19.6778 17.4677C19.2784 17.1116 18.9288 16.7035 18.6383 16.2542C18.3211 15.634 18.131 14.9568 18.0792 14.2621V12.2162C18.0819 11.1252 17.6861 10.0707 16.9662 9.25088C16.2463 8.43107 15.2518 7.90236 14.1696 7.76409V7.22983C14.1696 7.0832 14.1113 6.94257 14.0076 6.83888C13.9039 6.73519 13.7633 6.67694 13.6167 6.67694C13.47 6.67694 13.3294 6.73519 13.2257 6.83888C13.122 6.94257 13.0638 7.0832 13.0638 7.22983V7.77237C11.9912 7.92061 11.0087 8.45252 10.2983 9.26958C9.58784 10.0866 9.19756 11.1335 9.19974 12.2162V14.2621C9.14787 14.9568 8.95778 15.634 8.64063 16.2542C8.35524 16.7025 8.0112 17.1106 7.61768 17.4677C7.5735 17.5065 7.5381 17.5543 7.51382 17.6078C7.48954 17.6614 7.47694 17.7195 7.47687 17.7783V18.3415C7.47687 18.4514 7.5205 18.5567 7.59817 18.6344C7.67584 18.7121 7.78118 18.7557 7.89102 18.7557H19.4044C19.5143 18.7557 19.6196 18.7121 19.6973 18.6344C19.775 18.5567 19.8186 18.4514 19.8186 18.3415V17.7783C19.8185 17.7195 19.8059 17.6614 19.7816 17.6078C19.7574 17.5543 19.722 17.5065 19.6778 17.4677ZM8.3383 17.9274C8.72363 17.5551 9.0629 17.138 9.34883 16.6849C9.74833 15.9359 9.98142 15.1095 10.0322 14.2621V12.2162C10.0158 11.7309 10.0972 11.2471 10.2716 10.7939C10.446 10.3406 10.7098 9.92712 11.0474 9.57795C11.3849 9.22879 11.7893 8.95112 12.2364 8.76148C12.6835 8.57184 13.1642 8.47412 13.6498 8.47412C14.1355 8.47412 14.6161 8.57184 15.0632 8.76148C15.5103 8.95112 15.9147 9.22879 16.2522 9.57795C16.5898 9.92712 16.8536 10.3406 17.028 10.7939C17.2024 11.2471 17.2838 11.7309 17.2674 12.2162V14.2621C17.3182 15.1095 17.5513 15.9359 17.9508 16.6849C18.2367 17.138 18.576 17.5551 18.9613 17.9274H8.3383Z"
                    fill="black"
                  />
                  <path
                    d="M13.6684 20.1389C13.9293 20.1329 14.1796 20.0348 14.3752 19.862C14.5707 19.6892 14.6989 19.4528 14.7369 19.1946H12.5585C12.5976 19.4598 12.7317 19.7018 12.9359 19.8755C13.1401 20.0492 13.4004 20.1428 13.6684 20.1389Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_16_3380">
                    <rect
                      x="0.153809"
                      y="0.400024"
                      width="27.2"
                      height="27.2"
                      rx="13.6"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>

              {notifications > 0 ? (
                <div className="absolute inline-flex items-center justify-center w-3 p-1 h-3 text-[10px] font-bold text-white bg-red-400 border-2 border-white rounded-full top-2 end-[13px]"></div>
              ) : (
                ""
              )}
            </button>
          </a>
        </div>
      </div>
      {/* Dekstop View */}
      {/* {isMessagesRoute ? ( */}
      <div className="hidden sm:relative sm:block sm:w-[300px] sm:h-[100vh] sm:right-0 sm:allign-center  z-10 header w-full bg-white p-3 justify-between border">
        <div className="flex gap-4 p-3 ">
          {/* <a className='h-fit' href="/new-scale"><button className="bg-zinc-900 text-white px-10 p-3 rounded-[14px]">New Scale</button></a> */}
          <a className="flex items-center" href="/notifications">
            <button className="relative h-fit self-center">
              {/* <IoIosNotificationsOutline size="40px" /> */}
              <svg
                width="45"
                height="45"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_16_3380)">
                  <rect
                    x="0.153809"
                    y="0.400024"
                    width="27.2"
                    height="27.2"
                    rx="13.6"
                    fill="#E9E9E9"
                  />
                  <path
                    d="M19.6778 17.4677C19.2784 17.1116 18.9288 16.7035 18.6383 16.2542C18.3211 15.634 18.131 14.9568 18.0792 14.2621V12.2162C18.0819 11.1252 17.6861 10.0707 16.9662 9.25088C16.2463 8.43107 15.2518 7.90236 14.1696 7.76409V7.22983C14.1696 7.0832 14.1113 6.94257 14.0076 6.83888C13.9039 6.73519 13.7633 6.67694 13.6167 6.67694C13.47 6.67694 13.3294 6.73519 13.2257 6.83888C13.122 6.94257 13.0638 7.0832 13.0638 7.22983V7.77237C11.9912 7.92061 11.0087 8.45252 10.2983 9.26958C9.58784 10.0866 9.19756 11.1335 9.19974 12.2162V14.2621C9.14787 14.9568 8.95778 15.634 8.64063 16.2542C8.35524 16.7025 8.0112 17.1106 7.61768 17.4677C7.5735 17.5065 7.5381 17.5543 7.51382 17.6078C7.48954 17.6614 7.47694 17.7195 7.47687 17.7783V18.3415C7.47687 18.4514 7.5205 18.5567 7.59817 18.6344C7.67584 18.7121 7.78118 18.7557 7.89102 18.7557H19.4044C19.5143 18.7557 19.6196 18.7121 19.6973 18.6344C19.775 18.5567 19.8186 18.4514 19.8186 18.3415V17.7783C19.8185 17.7195 19.8059 17.6614 19.7816 17.6078C19.7574 17.5543 19.722 17.5065 19.6778 17.4677ZM8.3383 17.9274C8.72363 17.5551 9.0629 17.138 9.34883 16.6849C9.74833 15.9359 9.98142 15.1095 10.0322 14.2621V12.2162C10.0158 11.7309 10.0972 11.2471 10.2716 10.7939C10.446 10.3406 10.7098 9.92712 11.0474 9.57795C11.3849 9.22879 11.7893 8.95112 12.2364 8.76148C12.6835 8.57184 13.1642 8.47412 13.6498 8.47412C14.1355 8.47412 14.6161 8.57184 15.0632 8.76148C15.5103 8.95112 15.9147 9.22879 16.2522 9.57795C16.5898 9.92712 16.8536 10.3406 17.028 10.7939C17.2024 11.2471 17.2838 11.7309 17.2674 12.2162V14.2621C17.3182 15.1095 17.5513 15.9359 17.9508 16.6849C18.2367 17.138 18.576 17.5551 18.9613 17.9274H8.3383Z"
                    fill="black"
                  />
                  <path
                    d="M13.6684 20.1389C13.9293 20.1329 14.1796 20.0348 14.3752 19.862C14.5707 19.6892 14.6989 19.4528 14.7369 19.1946H12.5585C12.5976 19.4598 12.7317 19.7018 12.9359 19.8755C13.1401 20.0492 13.4004 20.1428 13.6684 20.1389Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_16_3380">
                    <rect
                      x="0.153809"
                      y="0.400024"
                      width="27.2"
                      height="27.2"
                      rx="13.6"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>

              {notifications > 0 ? (
                <div className="absolute inline-flex items-center justify-center w-3 p-1 h-3 text-[10px] font-bold text-white bg-red-400 border-2 border-white rounded-full top-2 end-[13px]"></div>
              ) : (
                ""
              )}
            </button>
          </a>
        </div>
        {window.innerWidth >= "975" ? <Suggestions /> : ''}
      </div> 
      {/* ) : null} */}
 
    </>
  );
}

export default React.memo(Header);
