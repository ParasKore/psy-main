import React, { useEffect, useState } from "react";
// Router imports
import { useParams, useNavigate } from "react-router-dom";
// Component
import Profile from "./Profile";
import Loader from "../../Components/Loader";
import Posts from "./Posts";
//Utility Functions
import GetUser from "../../lib/get-data";
import { PostApi } from "../../lib/axios-api";


const User = ({ userType }) => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    profile: "",
    followers: "",
    followings: "",
    followed: null,
  });
  const [loading, setLoading] = useState(true);
  const user = GetUser();

  const getProfile = async () => {

    if (username && userType == "guest") {
      const Data = await PostApi("user-profile", {
        user_name: username,
      });
      console.log(Data);
      setLoading(false);

      if (Data && Data.message == "profile found") {
        fillUserData(Data);
      }
    }

    if (userType == "auth") {
      const Data = await PostApi("my-profile");
      console.log(Data);
      setLoading(false);

      if (Data && Data.message == "profile found") {
        fillUserData(Data);
      }
    }
  };

  const fillUserData = (Data) => {
    setUserData(() => ({
      profile: Data.data.userProfile,
      followers: Data.data.followerCounts,
      followings: Data.data.followingCounts,
      followed: Data.data.follows,
    }));
  };

  useEffect(() => {
    getProfile();
    if (username && user.user_name == username) {
      navigate("/my-profile");
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="w-full h-[85vh] sm:h-[100vh] overflow-y-auto justify-center gap-4">
          <Profile userData={userData} userType={userType} />
          <Posts authUser={user} userData={userData} />
        </div>
      </>
    );
  }
};

export default User;
