import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostApi } from "../../lib/axios-api";
import verify_email from "../../Assets/animations/verify_email.json";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const verify = async () => {
    const Data = await PostApi("verify-email", { token: token });
    console.log(Data);

    if (Data) {
      if (Data.message == "validation error") {
        toast.error("Something went wrong!!");
      }
      if (Data.message == "email verified successfully") {
        toast.success("Email Verified!!");
      } else {
        toast.success("Email Already Verified!!");
      }
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error("Something went wrong!!");
    }
  };
  useEffect(() => {
    verify();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex justify-center items-center">
        <Lottie animationData={verify_email} loop={true} />
      </div>
      <ToastContainer />
    </div>
  );
}
