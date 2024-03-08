import React, { useState, useEffect } from "react";
//Library
import { Image, Dropdown, Button } from "antd";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoMdShare } from "react-icons/io";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { RWebShare } from "react-web-share";
import { Flag, Link, MoreVerticalIcon } from "lucide-react";
//Components
import Comments from "./Comments";
import Report from "../../lib/Report";
import Modal from "../../Components/Modal";
//Utility Functions
import GetUser, { GetHost } from "../../lib/get-data";
import { toast } from "react-toastify";
import { PostApi } from "../../lib/axios-api";
//Assets
import ErrorImg from "../../Assets/images/imgerror.png";

function Post({ data }) {
  //States Open Close
  const [showCmnts, setShowCmnts] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [likeBtnSt, setLikeBtnSt] = useState("DisLiked");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //Counts
  const [commentsCount, setCommentsCount] = useState(data.comments_count);
  const [likesCount, setLikesCount] = useState(data.likes_count);
  const [share, setShare] = useState(data.shares_count);

  //Data
  const user = GetUser();
  const content = data.content;
  useEffect(() => {}, []);
  useEffect(() => {
    if (data.liked_by_user == true) {
      setLikeBtnSt("Liked");
    }
  }, [data]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.origin + `/post/${data.id}`);

    toast.success("Link copied!!");
  };

  const handelLike = async () => {
    try {
      const res = await PostApi("post-like", {
        post_id: data.id,
      });

      if (res && res.message == "liked") {
        setLikeBtnSt("Liked");
        setLikesCount(parseInt(likesCount) + 1);
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  };

  const handelDisLike = async () => {
    try {
      const res = await PostApi("post-unlike", {
        post_id: data.id,
      });

      if (res && res.message == "unliked") {
        setLikeBtnSt("DisLiked");
        setLikesCount(parseInt(likesCount) - 1);
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  };

  const Share = async () => {
    const res = await PostApi("share", { post_id: data.id });

    console.log("res", res);

    if (res && res.message == "shared") {
      setShare(share + 1);
    }
  };

  //handel comment click
  const handelCommentClick = () => {
    setShowCmnts(!showCmnts);
  };

  //content length
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const AuthMessage = () => {
    toast.error("Login to use!!");
  };

  const authItems = [
    {
      label: (
        <div className="flex gap-2">
          <MdModeEditOutline size={20} />
          <a href={`/post/edit/${data.uuid}`}>Edit Post</a>
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <div className="flex gap-2">
          <MdDeleteOutline color="red" size={20} />
          <p
            href="#"
            style={{ color: "red" }}
            onClick={() => {
              setShowDeleteModal(true);
            }}
          >
            Delete Post
          </p>
        </div>
      ),
      key: "3",
    },
  ];

  const items = [
    {
      label: (
        <div className="flex gap-2">
          <Link size={20} />
          <p href="#" onClick={copyLink}>
            Copy Link to post
          </p>
        </div>
      ),
      key: "0",
    },
    user
      ? {
          label: (
            <div className="flex gap-2">
              <Flag size={20} />
              <p
                href="#"
                onClick={() => {
                  handleReport();
                }}
              >
                Report post
              </p>
            </div>
          ),
          key: "1",
        }
      : null,
    ...(user && user.id === data.user_id ? authItems : []),
  ].filter(Boolean); // Filter out null elements

  const handleDelete = async () => {
    try {
      const res = await PostApi("delete-post", { post_id: data.id });
      console.log("res", res);
      if (res) {
        if (res.message == "post deleted successfully") {
          toast.success("Post deleted successfully!!");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error("Something went wrong!!");
        }
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (error) {
      toast.error("Something went wrong!!");
      console.log(error);
    }
  };

  const handleReport = () => {
    setShowReportModal(true);
  };

  return (
    <div className="p-3 border-b my-3 border-gray-300">
      <div className="flex">
        <div className="flex p-2 w-full">
          <img
            className="rounded-[50%] self-center w-9"
            src={GetHost() + "server/profile/" + data.user.profile}
            alt="profile"
          />
          <div className="ml-3 w-full flex justify-between">
            <div>
              <a
                className="self-center text-[1.05em]"
                href={"/user/" + data.user.user_name}
              >
                {data.user.user_name}
              </a>

              <p className="text-sm">{data.user.about}</p>
            </div>

            <div>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <div className=" p-2 rounded-[50%] hover:bg-gray-200">
                  <MoreVerticalIcon size={20} />
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full rounded p-2 mb-2">
        <div className="whitespace-pre-line" style={{ lineBreak: "anywhere" }}>
          {showFullContent ? content : content.slice(0, 200)}
        </div>
        {content.length > 200 && !showFullContent && (
          <div className="self-end text-sm p-1 text-end">
            <p href="" onClick={toggleContent}>
              <u>Read More</u>
            </p>
          </div>
        )}
      </div>
      <div className="rounded-md flex flex-row w-full overflow-x-auto gap-2">
        {data.images
          ? data.images.map((media, index) => {
              return (
                <span key={index}>
                  <Image
                    className=" rounded-lg"
                    width={200}
                    src={GetHost() + "server/posts/images/" + media.name}
                    alt={`post-image-${index}`}
                    fallback={ErrorImg}
                    loading="lazy"
                  />
                </span>
              );
            })
          : ""}
      </div>
      <div className="w-full items-baseline justify-between flex mt-2">
        <div className="flex">
          <div className="flex">
            {likeBtnSt == "DisLiked" ? (
              <button
                className="hover:bg-gray-100 p-1 rounded-lg"
                onClick={user != null ? handelLike : AuthMessage}
              >
                <FaRegHeart size="25px" />
              </button>
            ) : (
              <button
                className="hover:bg-gray-100  text-red-500 p-1 rounded-lg"
                onClick={user != null ? handelDisLike : null}
              >
                <FaHeart size="25px" />
              </button>
            )}
            <p className="self-center ml-2">{likesCount} </p>
          </div>
          <div className="flex ml-4">
            <button
              onClick={handelCommentClick}
              className="hover:bg-gray-100 p-1 rounded-lg"
            >
              <IoChatbubbleOutline size="25px" />
            </button>
            <p className="self-center ml-2"> {commentsCount}</p>
          </div>
          <div className="flex ml-4">
            <RWebShare
              data={{
                text: data.content.substring(0, 150),
                url: window.location.origin + "/post/" + data.uuid,
                title: "Psychiatry Rounds Post",
              }}
              onClick={() => Share()}
            >
              <button className="hover:bg-gray-100 p-1 rounded-lg">
                <IoMdShare size="25px" />
              </button>
            </RWebShare>
            <p className="self-center ml-2"> {share}</p>
          </div>
        </div>
        <div>
          <h6 className="text-gray-600 text-[13px]">
            Posted · {data.human_readable_created_at}
          </h6>
        </div>
      </div>
      {showCmnts ? (
        <div className="mt-4">
          <div className="xs:ml-4">
            <Comments
              postId={data.id}
              user={user}
              setCommentsCount={() =>
                setCommentsCount(parseInt(commentsCount) + 1)
              }
            />
          </div>
        </div>
      ) : null}

      <Modal
        text=""
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      >
        <div className="w-full h-full overflow-y-auto">
          <div className="mx-auto text-center mb-4 w-48">
            <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this post?
            </p>
          </div>
        </div>
        <div className="w-full mt-1 flex justify-center items-center gap-2">
          <Button
            style={{
              backgroundColor: "rgb(156 163 175)",
              border: "none",
              color: "white",
            }}
            onClick={() => setShowDeleteModal(false)}
            className="xs:px-3 w-20 font-medium xs:py-2 rounded-3xl xs:w-32 h-11"
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: "red",
              border: "none",
              color: "white",
            }}
            onClick={handleDelete}
            className="xs:px-3 w-20 font-medium xs:py-2 rounded-3xl xs:w-32 h-11"
          >
            Delete
          </Button>
        </div>
      </Modal>

      <Report
        type="post"
        id={data.id}
        userId={data.user.id}
        show={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
    </div>
  );
}

export default React.memo(Post);
