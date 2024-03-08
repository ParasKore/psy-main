import React, { useEffect, useState } from "react";
//Library
import { useNavigate } from "react-router-dom";
//Utility Functions
import GetUser, { GetHost } from "../../lib/get-data";
import { PostApi } from "../../lib/axios-api";

function Suggestions({ layout }) {
  const [suggestions, setsuggestions] = useState([]);
  const user = GetUser();
  const navigate = useNavigate();

  const getData = async () => {
    const res = await PostApi("follow-suggestions");

    if (res && res.message == "users found") {
      setsuggestions(res.data);
    }

    console.log("res", res);
  };

  const userProfile = (user_name) => {
    navigate(`/user/${user_name}`, {
      state: { username: user_name },
    });
  };

  const follow = async (id) => {
    const Data = await PostApi("user-follow", {
      user_follow_id: id,
    });

    console.log("info", Data);

    if (Data && Data.message == "followed") {
      handleFollow(id);
    }
  };

  const handleFollow = (id) => {
    const updatedSuggestions = suggestions.map((suggestion) => {
      if (suggestion.id === id) {
        return { ...suggestion, follow: true };
      }
      return suggestion;
    });
    setsuggestions(updatedSuggestions);
  };

  useEffect(() => {
    if (user != null) {
      getData();
    }
  }, [user]);

  return (
    <div className="m-3 p-2">
      <p className="text-lg font-bold">Suggested for Follow</p>
      <div className="">
        {
          //we will get image from api after user request that is every child of array will request its own profile image
          suggestions.map((items, index) => {
            return (
              <div
                key={index}
                className="p-3 rounded-[12px] flex justify-between drop-shadow-lg bg-white my-4"
              >
                <div
                  onClick={() => userProfile(items.user_name)}
                  className="flex cursor-pointer gap-3"
                >
                  <img
                    width="35px"
                    className="rounded-[50%]"
                    src={GetHost() + "server/profile/" + items.profile}
                    alt=""
                  />
                  <a
                    href={`/user/${items.user_name}`}
                    className="self-center cursor-pointer text-[12px]"
                  >
                    {items.user_name}
                  </a>
                </div>

                <button
                  id={index}
                  onClick={() => follow(items.id)}
                  className={"text-[12px] px-3 rounded-[20px] " + (items.follow ? "bg-primary font-bold text-black" : "bg-zinc-900 text-white")}
                >
                  {items.follow ? "Following" : "Follow"}
                </button>
              </div>
            );
          })
        }
      </div>
      {/* <button> <u>Show More </u></button> */}
    </div>
  );
}

export default React.memo(Suggestions);
