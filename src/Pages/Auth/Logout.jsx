import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Components
import Loader from "../../Components/Loader";
//Utility
import { logout } from "../../redux/Slice/userSlice";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase/index";
import { signOut } from "firebase/auth";
import { PostApi } from "../../lib/axios-api";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const res = await PostApi("logout");
      dispatch(logout());

      if (res && res.message == "user logout successfully") {

        if (auth) {
          signOut(auth);
        }

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {}
  };

  useEffect(() => {
    logOut();
  }, []);

  return <Loader />;
}
