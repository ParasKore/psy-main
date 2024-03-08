import React, { useState } from "react";
//Library
import { Button, Dropdown } from "antd";
import { toast } from "react-toastify";
import Modal from "../../Components/Modal";
import { RWebShare } from "react-web-share";
import InfiniteScroll from "react-infinite-scroll-component";
//Utility Functions
import { GetHost } from "../../lib/get-data";
import { PostApi } from "../../lib/axios-api";
import Report from "../../lib/Report";
//Components
import UploadProfile from "./UploadProfile";
import UploadBanner from "./UploadBanner";
//Icons
import { SlLocationPin } from "react-icons/sl";
import { CiCalendarDate } from "react-icons/ci";
import { Edit2Icon, Flag, Link, MoreVerticalIcon, LogOut } from "lucide-react";
import { ShareOutline } from "react-ionicons";

function Profile({ userData, userType }) {
  //Model
  const [open, setOpen] = useState(false);
  const [usersListOpen, setusersListOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openBanner, setOpenBanner] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  //Data
  const [usersList, setusersList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [fetchType, setFetchType] = useState("");
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    name: userData.profile.name,
    about: userData.profile.about,
    location: userData.profile.location,
    number: userData.profile.number,
  });
  //Profile
  const [info, setinfo] = useState({
    id: userData.profile.id,
    name: userData.profile.name,
    bio: userData.profile.about,
    profile: userData.profile.profile,
    banner: userData.profile.banner,
    username: userData.profile.user_name,
    location: userData.profile.location,
    joiningdate: userData.profile.created_at,
    followercount: userData.followers,
    followingcount: userData.followings,
    followed: userData.followed,
  });

  const follow = async () => {
    const Data = await PostApi("user-follow", {
      user_follow_id: info.id,
    });

    console.log("info", Data);

    if (Data && Data.message == "followed") {
      window.location.reload();
    }
  };

  const unFollow = async (id, reload) => {
    const Data = await PostApi("user-unfollow", {
      user_follow_id: id,
    });

    console.log("info", Data);

    if (Data && Data.message == "unfollowed" && reload) {
      window.location.reload();
    } else {
      handleRemoveUser(id);
    }
  };

  const handleRemoveUser = (id) => {
    setusersList((l) => l.filter((item) => item.id !== id));
  };

  const editProfile = async (e) => {
    e.preventDefault();
    const res = await PostApi("update-profile", {
      ...formData,
    });

    console.log("res", res);

    if (res) {
      if (res.message == "profile updated") {
        toast.success("Profile updated!!");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      if (res.message == "validation error") {
        if (res.data.hasOwnProperty("user_name")) {
          toast.error(res.data.user_name[0]);
        }
      }
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(
      window.location.origin + `/user/${info.username}`
    );

    toast.success("Link copied!!");
  };

  const logoutBtn = {
    label: (
      <div className="flex gap-2">
        <LogOut color="red" size={20} />
        <a href="/logout" style={{ color: "red" }}>
          Log out
        </a>
      </div>
    ),

    key: "7",
  };
  const items = [
    {
      label: (
        <RWebShare
          data={{
            text: "View my profile on Psychiatry Rounds!!",
            url: window.location.origin + "/user/" + info.username,
            title: "Psychiatry Rounds",
          }}
        >
          <div className="flex gap-2">
            <ShareOutline />
            <p href="#">Share Profile</p>
          </div>
        </RWebShare>
      ),
      key: "0",
    },
    {
      label: (
        <div className="flex gap-2">
          <Link size={20} />
          <p href="#" onClick={copyLink}>
            Copy Link to profile
          </p>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div className="flex gap-2">
          <Flag size={20} />
          <p
            href="#"
            onClick={() => {
              setShowReportModal(true);
            }}
          >
            Report {info.username}
          </p>
        </div>
      ),
      key: "4",
      disabled: userType == "auth" ? true : null,
    },
    // {
    //   label: (
    //     <div className="flex gap-2">
    //       <Ban size={20} />
    //       <p href="#" onClick={() => {}}>
    //         Block {info.username}
    //       </p>
    //     </div>
    //   ),
    //   key: "5",
    //   disabled: userType == "auth" ? true : null,
    // },
    userType == "auth"
      ? ({
          type: "divider",
        },
        logoutBtn)
      : null
  ];

  const handleUserList = async (type) => {
    setFetchType(type);
    fetchUserList(type);
  };

  const fetchUserList = async (type = fetchType) => {
    try {
      const res = await PostApi(`${type}?page=${page}`, {
        user_id: info.id,
      });

      if (res) {
        if (res.message == "found") {
          if (res.data.length != 0) {
            if (res.data.next_page_url == null) {
              setHasMore(false);
            }
            setusersList([...usersList, ...res.data.data]);
            setusersListOpen(true);
            setPage(page + 1);
          }
        }
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  };

  return (
    <div>
      <div>
        <div className="flex flex-col justify-start items-start relative">
          <img
            src={GetHost() + "server/banner/" + info.banner}
            alt="banner"
            loading="lazy"
            className="w-[100%] aspect-[12/3] lg:aspect-[9/3] sm:h-[200px] max-[412px]:h-[150px]"
            id="banner"
          />
          {userType == "auth" ? (
            <div className="absolute bottom-10 sm:bottom-20 right-4 bg-[#fff] p-2 rounded-[50%] drop-shadow-lg">
              <Edit2Icon
                onClick={() => setOpenBanner(true)}
                className="cursor-pointer text-primary fill-primary"
              />
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-row justify-evenly items-start">
            <div className="sm:h-[150px] sm:w-[150px] w-[90px] h-[90px] rounded-[50%] border-solid border-2 z-10 ml-5 sm:ml-10 mt-[-32%] max-[412px]:h-[110px] max-[412px]:w-[110px]  ">
              <img
                src={GetHost() + "server/profile/" + info.profile}
                alt="profile"
                loading="lazy"
                className="bg-cover sm:h-[150px] sm:w-[150px] w-[90px] h-[90px] rounded-[50%] max-[412px]:h-[110px] max-[412px]:w-[110px] "
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col justify-start items-start mt-4 px-4 sm:px-10 sm:mt-4">
            <div className="flex justify-between w-full">
              <h1 className="text-[27px] font-[700] w-fit max-[431px]:text-[20px] ">
                {info.name}
              </h1>
              <div className="flex items-center gap-2">
                {userType == "auth" ? (
                  <Button
                    style={{
                      backgroundColor: "rgb(182, 204, 55)",
                      border: "none",
                    }}
                    onClick={() => setOpen(true)}
                    className="xs:px-5 text-white w-28 xs:py-2 font-[600] rounded-3xl xs:w-40 h-11"
                  >
                    <p className="hover:text-white ">Edit Profile</p>
                  </Button>
                ) : info.followed == false ? (
                  <Button
                    style={{
                      backgroundColor: "rgb(182, 204, 55)",
                      border: "none",
                      color: "black",
                    }}
                    onClick={follow}
                    className="xs:px-5 text-white xs:py-2 font-[600] rounded-3xl xs:w-40 h-11"
                  >
                    Follow
                  </Button>
                ) : (
                  <Button
                    style={{
                      backgroundColor: "rgb(182, 204, 55)",
                      border: "none",
                      color: "black",
                    }}
                    onClick={() => unFollow(info.id, true)}
                    className="xs:px-5 text-white xs:py-2 font-[600] rounded-3xl xs:w-40 h-11"
                  >
                    Unfollow
                  </Button>
                )}
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                >
                  <div className=" p-2 aspect-square h-fit rounded-[50%] hover:bg-gray-200">
                    <MoreVerticalIcon size={20} />
                  </div>
                </Dropdown>
              </div>
            </div>
            <h2 className="text-gray-500 text-[16px] mt-0 max-[431px]:text-[13px] ">
              @{info.username}
            </h2>

            <h3 className="text-black text-[16px] mt-2 xs:mt-5 max-[431px]:text-[14px]">
              {info.bio}
            </h3>
          </div>
          <div className="flex flex-row justify-start items-start mt-4 xs:mt-6 px-4 sm:px-9">
            <div className="flex flex-row justify-start items-center">
              <SlLocationPin size="1rem" color="gray" />
              <h3 className="text-gray-600 px-2 xs:px-3 text-[14px] mr-5 max-[431px]:text-[12px]">
                {info.location}
              </h3>
            </div>

            <div className="flex flex-row justify-start items-center">
              <CiCalendarDate size="1rem" color="gray" />
              <h3 className="text-gray-600 text-[14px] px-2 xs:px-3 max-[431px]:text-[12px]">
                {info.joiningdate}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-start justify-start">
          <div
            onClick={() => handleUserList("followers")}
            className="flex cursor-pointer flex-row items-start justify-start mt-4"
          >
            <h1 className="text-black text-[19px] font-[700] ml-4 sm:ml-9 max-[431px]:text-[15px]">
              {info.followercount}
            </h1>

            <h1 className="text-gray-600 text-[19px] px-2 max-[431px]:text-[15px]">
              Followers
            </h1>
          </div>
          <div
            onClick={() => handleUserList("followings")}
            className="flex cursor-pointer flex-row items-start justify-start mt-4 ml-3 "
          >
            <h1 className="text-[19px] text-black font-[700] max-[431px]:text-[15px]">
              {info.followingcount}
            </h1>

            <h1 className="text-[19px] text-gray-600 px-2 max-[431px]:text-[15px] ">
              Followings
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-center w-[100%] mt-6 bg-white">
          <h1 className="text-[14px] xs:text-[16px] font-[600] sm:text-[18px]">
            Posts
          </h1>
        </div>
      </div>

      <Modal text="Edit Profile" open={open} onClose={() => setOpen(false)}>
        <div className="w-full h-full overflow-y-auto">
          <div className="w-full flex justify-center items-center">
            <div className="sm:h-[150px] relative sm:w-[150px] w-[90px] h-[90px] rounded-[50%] mt-8 border-solid border-2 max-[412px]:h-[110px] max-[412px]:w-[110px]">
              <img
                src={GetHost() + "server/profile/" + info.profile}
                alt="profile"
                className="bg-cover sm:h-[150px] sm:w-[150px] w-[90px] h-[90px] rounded-[50%] max-[412px]:h-[110px] max-[412px]:w-[110px] "
              />
              <div className="w-auto h-auto bg-[rgba(0,0,0,0.15)] flex justify-center items-center absolute top-0 bottom-0 left-0 right-0 rounded-full">
                <Edit2Icon
                  onClick={() => {
                    setOpenProfile(true);
                    setOpen(false);
                  }}
                  className="cursor-pointer text-primary fill-primary"
                />
              </div>
            </div>
          </div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => {
              setFormData((prevVal) => ({
                ...prevVal,
                name: e.target.value,
              }));
            }}
            className={
              "bg-gray-100 text-[17px] px-4 h-[49px] outline-none rounded-[0.5em] w-[100%] mt-4"
            }
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location ? formData.location : ""}
            onChange={(e) => {
              setFormData((prevVal) => ({
                ...prevVal,
                location: e.target.value,
              }));
            }}
            className={
              "bg-gray-100 text-[17px] px-4 h-[49px] outline-none rounded-[0.5em] w-[100%] mt-3"
            }
          />
          <input
            type="number"
            placeholder="Number"
            value={formData.number ? formData.number : ""}
            onChange={(e) => {
              setFormData((prevVal) => ({
                ...prevVal,
                number: e.target.value,
              }));
            }}
            className={
              "bg-gray-100 text-[17px] px-4 h-[49px] outline-none rounded-[0.5em] w-[100%] mt-3"
            }
          />
          <textarea
            className="w-full p-2 px-4 bg-gray-100 outline-none mt-4 text-black rounded-[0.5em] resize-none box-border"
            rows="4"
            value={formData.about ? formData.about : ""}
            onChange={(e) => {
              setFormData((prevVal) => ({
                ...prevVal,
                about: e.target.value,
              }));
            }}
            placeholder="Bio"
          ></textarea>
        </div>
        <div className="w-full mt-4 flex justify-end items-center gap-2">
          <Button
            style={{
              backgroundColor: "rgb(156 163 175)",
              border: "none",
              color: "white",
            }}
            onClick={() => setOpen(false)}
            className="xs:px-3 w-20 font-medium xs:py-2 rounded-3xl xs:w-32 h-11"
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: "rgb(182, 204, 55)",
              border: "none",
              color: "white",
            }}
            onClick={editProfile}
            className="xs:px-3 w-20 font-medium xs:py-2 rounded-3xl xs:w-32 h-11"
          >
            Save
          </Button>
        </div>
      </Modal>
      <Modal
        text="Upload Profile"
        open={openProfile}
        onClose={() => setOpenProfile(false)}
      >
        <div className="w-full p-2 mt-2 h-full overflow-y-auto">
          <UploadProfile />
        </div>
      </Modal>
      <Modal
        text="Upload Banner"
        open={openBanner}
        onClose={() => setOpenBanner(false)}
      >
        <div className="w-full p-2 mt-2 h-full overflow-y-auto">
          <UploadBanner />
        </div>
      </Modal>

      <Modal
        text={fetchType == "followers" ? "Followers" : "Followings"}
        open={usersListOpen}
        onClose={() => {
          setusersListOpen(false);
          setusersList([]);
          setFetchType("");
          setPage(1);
          setHasMore(true);
        }}
      >
        <div
          id="scrollParentRef"
          className="w-full mt-3 h-full max-h-96 overflow-y-auto"
        >
          <InfiniteScroll
            dataLength={usersList.length}
            next={fetchUserList}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollParentRef"
          >
            {usersList.map((user, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center"
                >
                  <a
                    href={`/user/${user.user_name}`}
                    onClick={() => {
                      setusersListOpen(false);
                    }}
                    className="py-2 rounded-[12px] flex justify-start drop-shadow-sm bg-white my-1"
                  >
                    <div className="flex gap-3">
                      <img
                        className="rounded-[50%] w-auto h-10"
                        src={GetHost() + "server/profile/" + user.profile}
                        alt=""
                      />
                      <div className="flex justify-start flex-col">
                        <p className="text-black text-[0.9em]">
                          {user.user_name}
                        </p>
                        <p className="text-xs">{user.about}</p>
                      </div>
                    </div>
                  </a>
                  {fetchType == "followings" && userType == "auth" ? (
                    <button
                      onClick={() => unFollow(user.id, false)}
                      className="text-[12px] px-3 py-1.5 rounded-[20px] bg-zinc-900 text-white"
                    >
                      Unfollow
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </Modal>

      <Report
        type="user"
        id={info.id}
        userId={info.id}
        show={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
    </div>
  );
}

export default React.memo(Profile);
