import React, { useState } from "react";
//Components
import { EyeIcon, EyeOff } from "lucide-react";
//Router
import { useNavigate } from "react-router-dom";
//Redux
import { selectUser, login } from "../../redux/Slice/userSlice";
import { useSelector, useDispatch } from "react-redux";
//Library
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Utility Functions
import { PostApi } from "../../lib/axios-api";
import Helmet from "../../Helmet";
// Firebase import
import { signInWithGooglePopup } from "../../firebase";
// Stylesheet import
import "./Auth.css";
// Asset import
import AuthBg from "../../Assets/images/login-bg.jpg";

function Login() {
  // const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPswd, setShowPswd] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, [user]);

  const logUser = (data) => {
    dispatch(login({ user: data.user, token: data.token }));
  };

  const toastUpdate = (id, msg, type) => {
    toast.update(id, {
      render: msg,
      type: type,
      isLoading: false,
      autoClose: 2000,
      draggable: false,
    });
  };

  const logGoogleUser = async () => {
    try {
      const res = await signInWithGooglePopup();
      console.log("response", res);

      if (res && res.user) {
        const id = toast.loading("Logging you in...");

        const login = await PostApi("social-login", {
          access_token: res.user.accessToken,
        });

        console.log("login", login);

        if (login) {
          if (login.message == "user not found") {
            toastUpdate(id, "User not found!!", "error");

            setTimeout(() => {
              navigate("/register");
            }, 1500);
          }
          if (login.message == "user authenticated successfully") {
            logUser(login.data);

            toastUpdate(id, "Login successfull!!", "success");

            setTimeout(() => {
              navigate("/");
            }, 1500);
          }
        } else {
          toastUpdate(id, "Login failed!!", "error");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handelLogin = async () => {
    if (formData.email === "" || formData.password === "") {
      toast.error("All fields are required!!");
    } else {
      const id = toast.loading("Logging you in...");
      try {
        const res = await PostApi("login", formData);

        console.log("login", res);

        if (res) {
          if (res.message == "validation error") {
            setErrors(() => ({
              email: register.data.email,
              password: register.data.password,
            }));
          }

          if (res.message == "user found") {
            logUser(res.data);

            toastUpdate(id, "Login successfull!!", "success");

            setTimeout(() => {
              navigate("/");
            }, 1500);
          } else {
            toastUpdate(id, res.message, "error");
          }
        } else {
          toastUpdate(id, "Login failed!!", "error");
        }
      } catch (error) {
        toastUpdate(id, "Something went wrong!!", "error");
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: AuthBg,
      }}
      id="sign-up-bg"
      className="h-[100vh] flex justify-center items-center bg-cover bg-center
    "
    >
      {<Helmet page="login" />}
      <div className=" flex items-center justify-center login-box">
        <ToastContainer />
        <div className="flex items-center justify-center ">
          <div
            className="bg-white  w-[650px] py-10 px-[52px] rounded-[1em]"
            id="login-container"
          >
            <h2 className="text-center text-[30px] font-[600] text-black">
              Welcome Back!
            </h2>
            <div
              id="greeting"
              className="flex flex-col items-center justify-center mb-3"
            >
              <h4 className="text-gray-500 text-[18px] font-[500]">
                Glad to see you doctor 🩺
              </h4>
              <h4 className="text-gray-500 text-[18px] font-[500]">
                Login in to your account below
              </h4>
            </div>
            <div>
              <div className="form-group mb-[10px] mt-[0px]">
                <input
                  onChange={(e) => {
                    setFormData((prevVals) => ({
                      ...prevVals,
                      email: e.target.value,
                    }));
                  }}
                  type="email"
                  id="username"
                  name="email"
                  placeholder="Enter email"
                  className={
                    "w-[100%] h-[55px] rounded-[1em] bg-gray-200 outline-none mt-[4%] text-[18px] px-[15px] " +
                    (errors.email && errors.email != ""
                      ? "border-red-400 border-2"
                      : "border-none")
                  }
                />
                {errors.email && errors.email != "" ? (
                  <span className="text-red-500 w-full mt-1 -mb-1">
                    {errors.email}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <div id="btn123">
                  <div className="relative">
                    <input
                      type={showPswd ? "text" : "password"}
                      onChange={(e) => {
                        setFormData((prevVals) => ({
                          ...prevVals,
                          password: e.target.value,
                        }));
                      }}
                      id="password"
                      name="password"
                      placeholder="Password"
                      className={
                        "w-[100%] h-[55px] rounded-[1em] bg-gray-200 outline-none mt-[1%] text-[18px] px-[15px] " +
                        (errors.password && errors.password != ""
                          ? "border-red-400 border-2"
                          : "border-none")
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
                    {errors.password && errors.password != "" ? (
                      <span className="text-red-500 w-full mt-1 -mb-1">
                        {errors.password}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                id="button"
                onClick={handelLogin}
                className="h-[50px] w-[100%] rounded-[1em] mt-[3%] "
              >
                Log in
              </button>
              <div>
                <a href="/forgot-password">
                  <p className="text-[18px] text-center mt-4 mb-3 ">
                    Forgot Password?
                  </p>
                </a>

                <h1 className="text-center text-[18px] text-gray-500">or</h1>
              </div>
              <div
                onClick={logGoogleUser}
                id="google"
                className="flex items-center justify-evenly mt-[15px]"
              >
                <button
                  id="btn2"
                  className="bg-gray-200 text-black px-10 py-2 text-[15px]  rounded-xl font-[400] flex flex-row items-center justify-center   "
                >
                  <div className="flex flex-row items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="30"
                      height="30"
                      viewBox="0 0 48 48"
                      className="mr-3 "
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>{" "}
                    Continue with Google
                  </div>
                </button>
              </div>
              <div
                id="footer"
                className="mt-[31px] flex flex-row items-center justify-center 
                mb-10
                "
              >
                <h4 className="text-[18px] text-gray-500">
                  Don't have an account?
                </h4>
                <a href="/register">
                  <button className="text-black text-[18px] font-[500] ml-2  ">
                    Sign up
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
