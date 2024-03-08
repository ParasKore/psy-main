import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//Utility Functions
import { selectUser } from "../../redux/Slice/userSlice";
import { useSelector } from "react-redux";
import { PostApi } from "../../lib/axios-api";
import { useDispatch } from "react-redux";
import { login } from "../../redux/Slice/userSlice";
//Library
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithGooglePopup } from "../../firebase";
//Components
import Modal from "../../Components/Modal";
import { Button, Select } from "antd";
import "./Auth.css";
import Helmet from "../../Helmet";
//Data
import data from "../../lib/countryList.json";

function Signup() {
  // const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, []);

  const [user_name, setUserName] = useState("");
  const [google_user, setGoogleUser] = useState();
  const [errors, setErrors] = useState({
    name: "",
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    user_name: "",
    country: "",
    password: "",
    confirm_password: "",
  });

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
    const res = await signInWithGooglePopup();
    console.log("response", res);

    if (res) {
      setOpen(true);
      setGoogleUser(res.user);
    }
  };

  const registerGoogleUser = async () => {
    if (user_name != "" || formData.country != "") {
      if (google_user) {
        const id = toast.loading("Registering you in...");

        const register = await PostApi("social-register", {
          access_token: google_user.accessToken,
          name: google_user.displayName,
          user_name: user_name,
          email: google_user.email,
          number: google_user.phoneNumber,
          profile: google_user.photoURL,
          country: formData.country,
        });

        console.log("register", register);

        if (register) {
          if (register.message == "user registered successfully") {
            dispatch(
              login({ user: register.data.user, token: register.data.token })
            );

            toastUpdate(id, "Registration successfull!!", "success");

            setTimeout(() => {
              navigate("/");
            }, 1500);
          }

          if (register.message == "user already exists") {
            toastUpdate(id, "User already exists!!", "error");
          }

          if (register.message == "validation error") {
            let msg = "Registration failed!!";

            if (register.data.hasOwnProperty("email")) {
              msg = register.data.email[0];
            }

            if (register.data.hasOwnProperty("user_name")) {
              msg = register.data.user_name[0];
            }

            toastUpdate(id, msg, "error");
          }
        } else {
          toastUpdate(id, "Registration failed!!", "error");
        }
      }
    } else {
      toast.error("All fields are required!!");
    }
  };

  const handelRegister = async () => {
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.user_name === "" ||
      formData.name === "" ||
      formData.country === "" ||
      formData.confirm_password === ""
    ) {
      toast.error("All fields are required!!");
    } else {
      const id = toast.loading("Registering you in...");
      try {
        const register = await PostApi("register", formData);

        console.log("register", register);

        if (register && register.message == "validation error") {
          setErrors(() => ({
            email: register.data.email,
            name: register.data.name,
            user_name: register.data.user_name,
            country: register.data.country,
            password: register.data.password,
            confirm_password: register.data.confirm_password,
          }));
        }

        if (register && register.message == "user created successfully") {
          dispatch(
            login({ user: register.data.user, token: register.data.token })
          );

          toastUpdate(id, "Registration successfull!!", "success");

          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          toastUpdate(id, "Registration failed!!", "error");
        }
      } catch (error) {
        toastUpdate(id, "Registration failed!!", "success");
      }
    }
  };

  return (
    <div>
      {<Helmet page="register" />}
      <div
        id="sign-up-bg"
        className="flex items-start sm:items-center py-8 justify-center overflow-y-auto  bg-cover h-[100vh]"
      >
        <div
          id="signupcont"
          className="bg-white h-fit sm:w-[650px] w-[90%] px-4 rounded-[1em]"
        >
          <h2 className="mt-8 text-[30px] font-[600] flex items-center justify-center">
            Sign up
          </h2>
          <div className="flex flex-col items-center justify-center mt-3">
            <h4 className="text-gray-500 text-center text-[18px] font-[500]">
              Build your connections with psychiatrists worldwide{" "}
            </h4>
          </div>
          <div className="flex flex-col items-center justify-center px-4 mb-4">
            <input
              onChange={(e) => {
                setFormData((prevVals) => ({
                  ...prevVals,
                  email: e.target.value,
                }));
              }}
              type="email"
              placeholder="E-mail address"
              className={
                "bg-gray-100 text-[17px] px-4 h-[49px] outline-none rounded-[0.5em] w-[100%] mt-6 " +
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
            <input
              onChange={(e) => {
                setFormData((prevVals) => ({
                  ...prevVals,
                  name: e.target.value,
                }));
              }}
              type="text"
              placeholder="Fullname"
              className={
                "bg-gray-100 text-[17px] px-4 h-[49px] outline-none rounded-[0.5em] w-[100%] mt-6 " +
                (errors.name && errors.name != ""
                  ? "border-red-400 border-2"
                  : "border-none")
              }
            />
            {errors.name && errors.name != "" ? (
              <span className="text-red-500 w-full mt-1 -mb-1">
                {errors.name}
              </span>
            ) : (
              ""
            )}
            <input
              onChange={(e) => {
                setFormData((prevVals) => ({
                  ...prevVals,
                  user_name: e.target.value,
                }));
              }}
              type="text"
              placeholder="Username"
              className={
                "bg-gray-100 text-[17px] px-4 h-[49px] outline-none rounded-[0.5em] w-[100%] mt-6 " +
                (errors.user_name && errors.user_name != ""
                  ? "border-red-400 border-2"
                  : "border-none")
              }
            />
            {errors.user_name != "" ? (
              <span className="text-red-500 w-full mt-1 -mb-1">
                {errors.user_name}
              </span>
            ) : (
              ""
            )}
            <Select
              onChange={(e) => {
                setFormData((prevVals) => ({
                  ...prevVals,
                  country: e,
                }));
              }}
              showSearch
              placeholder="Country"
              className={
                "bg-gray-100 text-[17px] px-1 h-[49px] outline-none rounded-[0.5em] w-[100%] mt-6 " +
                (errors.country && errors.country != ""
                  ? "border-red-400 border-2"
                  : "border-none")
              }
            >
              {data.map((item, index) => {
                return (
                  <Select.Option key={index} value={item.name}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
            {errors.country != "" ? (
              <span className="text-red-500 w-full mt-1 -mb-1">
                {errors.country}
              </span>
            ) : (
              ""
            )}
            <div className="flex sm:flex-row flex-col items-center justify-around mt-6 w-full md:gap-1 gap-6">
              <div className="flex flex-row sm:items-center justify-end w-full ">
                <input
                  onChange={(e) => {
                    setFormData((prevVals) => ({
                      ...prevVals,
                      password: e.target.value,
                    }));
                  }}
                  type="password"
                  id="pass"
                  placeholder="Password"
                  className={
                    "h-[49px] bg-gray-100 text-[17px] rounded-xl px-4 outline-none sm:w-[270px] w-[100%] " +
                    (errors.password && errors.password != ""
                      ? "border-red-400 border-2"
                      : "border-none")
                  }
                />
                {/* <BiHide size="1.5rem" id='icon1'/> */}
              </div>
              {errors.password && errors.password != "" ? (
                <span className="text-red-500 w-full mt-1 -mb-1">
                  {errors.password}
                </span>
              ) : (
                ""
              )}

              <div className="flex flex-row items-center justify-end w-full ">
                <input
                  onChange={(e) => {
                    setFormData((prevVals) => ({
                      ...prevVals,
                      confirm_password: e.target.value,
                    }));
                  }}
                  type="password"
                  id="confirmpass"
                  placeholder="Confirm Password"
                  className={
                    "h-[49px] bg-gray-100 text-[17px] rounded-xl px-4 outline-none sm:w-[270px] w-[100%] " +
                    (errors.confirm_password && errors.confirm_password != ""
                      ? "border-red-400 border-2"
                      : "border-none")
                  }
                />
                {/* <BiHide size="1.5rem" id='icon1'/> */}
              </div>
              {errors.confirm_password && errors.confirm_password != "" ? (
                <span className="text-red-500 w-full mt-1 -mb-1">
                  {errors.confirm_password}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex items-center justify-center px-[52px]  ">
            <button
              onClick={handelRegister}
              id="btnlogin"
              type="submit"
              className="bg-[#B6CC37] h-[50px] w-[100%] rounded-[1em] mt-[3%] "
            >
              Sign up
            </button>
          </div>
          <h1 className="text-center mt-4 text-[18px] text-gray-500">or</h1>

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
          <div className="flex items-center flex-row justify-center my-8 mb-12">
            <h4 className="text-[18px] text-gray-500">
              Already have an account?
            </h4>
            <a href="/login">
              <button className="text-black text-[18px] font-[500] px-2  ">
                Log in
              </button>
            </a>
          </div>
        </div>
      </div>
      <Modal text="Set Username" open={open} onClose={() => setOpen(false)}>
        <div className="w-full h-full mt-4 overflow-y-auto">
          <input
            type="text"
            placeholder="Username"
            value={user_name}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            className={
              "bg-gray-100 text-[17px] px-4 h-[49px] outline-none rounded-[0.5em] w-[100%] mt-3"
            }
          />
          <Select
            onChange={(e) => {
              setFormData((prevVals) => ({
                ...prevVals,
                country: e,
              }));
            }}
            showSearch
            placeholder="Country"
            className={
              "bg-gray-100 text-[17px] px-1 h-[49px] outline-none rounded-[0.5em] w-[100%] mt-6 "
            }
          >
            {data.map((item, index) => {
              return (
                <Select.Option key={index} value={item.name}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </div>
        <div className="w-full mt-4 flex justify-end items-center gap-2">
          <Button
            style={{
              backgroundColor: "rgb(156 163 175)",
              border: "none",
              color: "white",
            }}
            onClick={() => setOpen(false)}
            className="xs:px-3 w-20 font-bold xs:py-2 rounded-3xl xs:w-32 h-11"
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: "rgb(182, 204, 55)",
              border: "none",
              color: "black",
            }}
            className="xs:px-3 w-20 font-bold xs:py-2 rounded-3xl xs:w-32 h-11"
            onClick={registerGoogleUser}
          >
            Save
          </Button>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Signup;
