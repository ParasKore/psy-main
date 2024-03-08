import React, { useState, useEffect } from "react";
//Components
import Header from "../Components/LayoutComponents/Header";
import Footer from "../Components/LayoutComponents/Footer";
//Library
import { ToastContainer } from "react-toastify";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

function Layout({ children }) {
  const location = useLocation();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    window.addEventListener("resize", changeWindowSize);
    
    return () => {
      window.removeEventListener("resize", changeWindowSize);
    };
  }, []);
  const isMessagesRoute = location.pathname === "/messages";

  return (
    <>
      <div className="sm:flex">
        <div className="sm:relative">
          <Footer />
        </div>
        {!isMessagesRoute ? (
          <div className="sm:hidden block">
            {windowSize.width <= "975" ? <Header /> : ""}
          </div>
        ) : null}
        <div className="grow  h-[100vh] ">{children}</div>
        {!isMessagesRoute ? (
          <div className="sm:block sm:relative hidden">
            {windowSize.width >= "975" ? <Header /> : ""}
          </div>
        ) : null}
        <ToastContainer />
      </div>
    </>
  );
}

export default Layout;
