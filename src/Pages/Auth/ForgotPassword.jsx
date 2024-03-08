import React, { useState, useContext } from "react";
// Router
import { useNavigate } from "react-router-dom";
//Library
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Utility Functions
import { PostApi } from "../../lib/axios-api";
import Helmet from "../../Helmet";
//Assets
import { Unlock, UnlockKeyhole, MoveLeft } from "lucide-react";
// Stylesheet import
import "./Auth.css";

function ForgotPass({}) {
  const [email, setEmail] = useState("");

  const toastUpdate = (id, msg, type) => {
    toast.update(id, {
      render: msg,
      type: type,
      isLoading: false,
      autoClose: 2000,
      draggable: false,
    });
  };

  const handelPost = async () => {
    if (email == "") {
      toast.error("Email is required!!");
    } else {
      try {
        const id = toast.loading("sending reset link...");
        const res = await PostApi("forgot-password", { email: email });

        if (res) {
          if (res.message == "validation error") {
            setError(res.data.email);
          } else {
            toastUpdate(
              id,
              res.message,
              res.type == "false" ? "error" : "success"
            );
          }
        } else {
          toastUpdate(id, "Sending failed!!", "error");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <div
      id="sign-up-bg"
      className="h-[100vh] flex items-center justify-center px-4  bg-cover"
    >
      <Helmet page="forgot-password" />
      <div className="flex items-center justify-center login-box">
        <ToastContainer />
        <div className="flex items-center justify-center">
          <div
            className="bg-white flex flex-col items-center justify-center  px-10 rounded-[1em] h-[500px] 
            "
            id=""
          >
            <div
              style={{ backgroundColor: "rgba(182, 204, 55, 0.2)" }}
              className="flex items-center justify-center h-12 w-12 rounded-full "
            >
              <UnlockKeyhole color={"rgba(182, 204, 55, 1)"} className="" />
            </div>
            <h2 className="text-center font-[550] text-[180%] text-black mt-2  ">
              Forgot Password ?
            </h2>
            <div
              id="greeting"
              className="flex flex-col items-center justify-center mb-3"
            >
              <h4 className="text-gray-500 text-[18px] font-[500] text-center">
                No worries , We'll send you the reset instructions
              </h4>
            </div>
            <div className="w-full">
              <div className="form-group w-full mb-[10px] mt-[0px]">
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  value={email}
                  id="username"
                  name="username"
                  placeholder="Enter email"
                  className="w-[100%] h-[55px] rounded-[1em] bg-gray-200 border-none outline-none mt-[4%] text-[18px] px-[15px]"
                />
              </div>

              <button
                type="submit"
                id="button"
                onClick={handelPost}
                className="h-[50px] w-[100%] rounded-[1em] text-white  mt-[3%] "
              >
                Reset Password
              </button>
              <div className=" flex flex-row  items-center justify-center mt-8">
                <a className="flex" href="/login">
                  <MoveLeft className="mr-3 " />

                  <h2>Back to login</h2>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
