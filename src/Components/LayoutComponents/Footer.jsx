import React from "react";
//Router
import { useLocation } from "react-router-dom";
//Assets
import Logo from "../../Assets/images/logo-full.png";
import Logout from "../../Assets/svg/logout.svg";
import { MessageCircleMore } from "lucide-react";

function Footer() {
  const { pathname } = useLocation();

  return (
    <div className="footer  bg-white  z-40 flex w-full sm:rounded-none rounded-t-[1rem] lg:w-[300px] sm:w-[250px] sm:h-[100vh] sm:flex sm:flex-col  sm:gap-6 sm:pl-[50px] sm:justify-between bottom-0 left-0  border  p-3 px-5 ">
      <div className="flex h-[29px] w-full sm:flex sm:flex-col sm:justify-start sm:gap-6  justify-between">
        <a className="hidden  w-[200px] sm:block my-2 ml-[-15px]" href="/">
          <img src={Logo} alt="" />
        </a>

        <p className="mdFont hidden sm:block text-[1.4rem]">Menu</p>
        <a className="flex" href="/">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 17H16M11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764Z"
              stroke={pathname == "/" ? "#B6CC37" : "#000"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p
            className={
              "self-center hidden sm:block  ml-4 text-[1.1rem] text-black font-medium " +
              (pathname == "/" ? "text-primary" : "")
            }
          >
            Home
          </p>
        </a>
        <a className="flex" href="/search">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21L17.5001 17.5M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z"
              stroke={pathname == "/search" ? "#B6CC37" : "#000"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p
            className={
              "self-center hidden sm:block  ml-4 text-[1.1rem] text-black font-medium " +
              (pathname == "/search" ? "text-primary" : "")
            }
          >
            Search
          </p>
        </a>
        <a className="flex" href="/create-post">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 14V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H10V5H5V19H19V14H21Z"
              fill={pathname == "/create-post" ? "#B6CC37" : "#000"}
            />
            <path
              d="M21 7H17V3H15V7H11V9H15V13H17V9H21V7Z"
              fill={pathname == "/create-post" ? "#B6CC37" : "#000"}
            />
          </svg>

          <p
            className={
              "self-center hidden sm:block  ml-4 text-[1.1rem] text-black font-medium " +
              (pathname == "/create-post" ? "text-primary" : "")
            }
          >
            Create Post
          </p>
        </a>
        <a className="flex" href="/trending">
          <svg
            width="19"
            height="25"
            viewBox="0 0 20 25"
            fill={pathname == "/trending" ? "#B6CC37" : "none"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.09755 1.09438C7.99416 1.03261 7.87598 1 7.75555 1C7.63512 1 7.51694 1.03261 7.41355 1.09438C7.32806 1.16211 7.27037 1.25885 7.25141 1.36627C7.23246 1.47368 7.25355 1.58432 7.31069 1.67723C9.41412 5.31666 9.85812 10.2761 6.98498 13.0104C5.88062 12.0818 5.00386 10.9125 4.42212 9.59209C3.36004 10.1819 2.47979 11.0514 1.87688 12.1061C1.27397 13.1608 0.971445 14.3605 1.00212 15.5749C1.0456 16.6457 1.3028 17.697 1.75858 18.6669C2.21436 19.6368 2.85951 20.5057 3.65609 21.2226C4.45267 21.9395 5.38457 22.4898 6.39698 22.8412C7.40939 23.1925 8.48185 23.3379 9.55126 23.2687C15.0558 23.2687 17.9118 19.8504 18.0987 15.5749C18.3216 10.4458 14.6804 4.13723 8.09755 1.09438Z"
              stroke={pathname == "/trending" ? "#B6CC37" : "black"}
              strokeWidth="1.71429"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p
            className={
              "self-center hidden sm:block  ml-4 text-[1.1rem] text-black font-medium " +
              (pathname == "/trending" ? "text-primary" : "")
            }
          >
            Trending
          </p>
        </a>
        <a className="flex" href="/messages">
          <MessageCircleMore />
          <p
            className={
              "self-center hidden sm:block  ml-4 text-[1.1rem] text-black font-medium " +
              (pathname == "/my-profile" ? "text-primary" : "")
            }
          >
            chat
          </p>
        </a>
        <a className="flex" href="/my-profile">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 18C4 16.9391 4.42143 15.9217 5.17157 15.1716C5.92172 14.4214 6.93913 14 8 14H16C17.0609 14 18.0783 14.4214 18.8284 15.1716C19.5786 15.9217 20 16.9391 20 18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18Z"
              stroke={pathname == "/my-profile" ? "#B6CC37" : "#000"}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10Z"
              stroke={pathname == "/my-profile" ? "#B6CC37" : "#000"}
              strokeWidth="2"
            />
          </svg>

          <p
            className={
              "self-center hidden sm:block  ml-4 text-[1.1rem] text-black font-medium " +
              (pathname == "/my-profile" ? "text-primary" : "")
            }
          >
            Profile
          </p>
        </a>
        {/* <a className="flex" href="/scales">

                    <img src={UserProfileImg} width="25px" alt="" />
                    <p className="self-center hidden sm:block ml-4 text-[1.1rem] text-[#717171] font-medium">All Scales</p>

                </a> */}
      </div>
      <a href="/logout" className="w-fit p-4 hidden sm:block">
        <div>
          <div className="flex gap-4">
            <img src={Logout} alt="" />
            <p>Logout</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default React.memo(Footer);
