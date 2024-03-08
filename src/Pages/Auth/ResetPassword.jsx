import React, { useState, useContext } from "react";
// Router
import { useNavigate, useParams } from "react-router-dom";
//Library
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Utility Functions
import { PostApi } from "../../lib/axios-api";
import Helmet from "../../Helmet";
//Assets
import { Unlock, UnlockKeyhole, MoveLeft, EyeIcon, EyeOff } from "lucide-react";
// Stylesheet import
import "./Auth.css";

function ResetPass() {
  const { token } = useParams();
  const [showPswd, setShowPswd] = useState(false);
  const [showCPswd, setCShowPswd] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

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
    if (password == "" || confirmPassword == "") {
      toast.error("All Fields are required!!");
    } else {
      try {
        const id = toast.loading("updating password...");
        const res = await PostApi("reset-password", {
          token: token,
          password: password,
          confirm_password: confirmPassword,
        });

        if (res) {
          if (res.message == "password reset successfull") {
            toastUpdate(id, "Password Updated!!", res.type == "success");

            setTimeout(() => {
              navigate("/login");
            }, 1500);
          }
          if (res.message == "validation error") {
            if (res.data && res.data.confirm_password) {
              toastUpdate(
                id,
                res.data.confirm_password[0],
                res.type == "false" ? "error" : "success"
              );
            }
            if (res.data && res.data.password) {
              toastUpdate(
                id,
                res.data.password[0],
                res.type == "false" ? "error" : "success"
              );
            }
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
              Reset Password
            </h2>
            <div
              id="greeting"
              className="flex flex-col items-center justify-center mb-3"
            >
              <h4 className="text-gray-500 text-[18px] font-[500] text-center">
                Enter new Password to reset & login again
              </h4>
            </div>
            <div className="w-full">
              <div className="form-group w-full mb-[10px] mt-[0px]">
                <div id="btn123">
                  <div className="relative mb-2">
                    <input
                      type={showPswd ? "text" : "password"}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      id="password"
                      name="password"
                      placeholder="Password"
                      className={
                        "w-[100%] h-[55px] rounded-[1em] bg-gray-200 outline-none mt-[1%] text-[18px] px-[15px] "
                      }
                    />
                    {showPswd ? (
                      <EyeOff
                        size="24"
                        onClick={() => {
                          setShowPswd(false);
                        }}
                        className="absolute top-1.5 xs:top-[0.6rem] right-0 m-3 cursor-pointer"
                      />
                    ) : (
                      <EyeIcon
                        size="24"
                        onClick={() => {
                          setShowPswd(true);
                        }}
                        className="absolute top-1.5 xs:top-[0.6rem] right-0 m-3 cursor-pointer"
                      />
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showCPswd ? "text" : "password"}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      id="confirm_password"
                      name="confirm_password"
                      placeholder="Confirm Password"
                      className={
                        "w-[100%] h-[55px] rounded-[1em] bg-gray-200 outline-none mt-[1%] text-[18px] px-[15px] "
                      }
                    />
                    {showCPswd ? (
                      <EyeOff
                        size="24"
                        onClick={() => {
                          setCShowPswd(false);
                        }}
                        className="absolute top-1.5 xs:top-[0.6rem] right-0 m-3 cursor-pointer"
                      />
                    ) : (
                      <EyeIcon
                        size="24"
                        onClick={() => {
                          setCShowPswd(true);
                        }}
                        className="absolute top-1.5 xs:top-[0.6rem] right-0 m-3 cursor-pointer"
                      />
                    )}
                  </div>
                </div>
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

export default ResetPass;
