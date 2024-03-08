import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
//Utility Functions
import { GetHost } from "../../lib/get-data";
import { PostApi } from "../../lib/axios-api";
import AddReply from "./AddReply";

const Replies = ({ commentId, postId, user }) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [replies, setReplies] = useState([]);

  const handleReplies = (newReply) => {
    setReplies([...replies, newReply]);
  };

  const fetchReplies = async () => {
    try {
      const res = await PostApi(`fetch-replies?page=${page}`, {
        post_id: postId,
        comment_id: commentId,
      });

      console.log("res", res);

      if (res) {
        if (res.message == "replies found") {
          if (res.data.length != 0) {
            if (res.data.next_page_url == null) {
              setHasMore(false);
            }
            setPage(page + 1);
            console.log("res.data.data", res.data.data);
            if (typeof res.data.data == "object") {
              const responseData = res.data.data;
              Object.values(responseData).forEach((value) => {
                setReplies((prevReplies) => [...prevReplies, value]);
              });
            } else {
              setReplies([...replies, ...res.data.data]);
            }
          }
        }
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (error) {
      toast.error("Something went wrong!!");
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  return (
    <div className="mt-4">
      {replies.map((item) => {
        console.log(item.content.split(/(@[^ ]+)/)[1]);

        return (
          <Reply
            key={item.id}
            commentId={commentId}
            handleReplies={handleReplies}
            postId={postId}
            user={user}
            item={item}
          />
        );
      })}

      {replies.length > 0 && hasMore ? (
        <div onClick={fetchReplies} className="text-sm text-center">
          Load more
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export const Reply = ({ postId, commentId, user, item, handleReplies }) => {
  const [nestedReply, setNestedReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const wordLimit = 40;
  const inputRef = useRef(null);

  const toggleSubReply = () => {
    setNestedReply(!nestedReply);
  };

  useEffect(() => {
    if (nestedReply != false) {
      setReplyContent(`@${item.user.user_name} `);
      inputRef.current.focus();
    } else {
      setReplyContent("");
    }
  }, [nestedReply]);

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
    const words = e.target.value.trim().split(/\s+/);
    if (words.length > wordLimit) {
      setReplyContent(words.slice(0, wordLimit).join(" "));
    }
  };

  const handleReplySubmit = async () => {
    console.log("replyContent", replyContent);
    if (replyContent == "") {
      toast.error("You have not written anything!");
    } else {
      const newReply = await AddReply(
        user,
        postId,
        commentId,
        item.id,
        replyContent
      );
      handleReplies(newReply[0]);
      console.log("newReply", newReply);
      toggleSubReply();
    }
  };

  return (
    <div className="flex items-start">
      <img
        src={GetHost() + "server/profile/" + item.user.profile}
        alt={`${item.name}'s profile`}
        className="w-8 h-8 rounded-full mr-4"
      />
      <div className="w-full">
        <a href={"/user/" + item.user.user_name} className="font-bold mr-2">
          {item.user.user_name}
        </a>
        <span className="text-gray-500">{item.human_readable_created_at}</span>

        <p className="text-black">
          {" "}
          <a href={`/user/${item.user.user_name}`} className="text-primary">
            {item.content.split(/(@[^ ]+)/)[1]}{" "}
          </a>
          {item.content.split(/(@[^ ]+)/)[2]}
        </p>
        <div>
          <button
            className="text-[#6C757D] my-2 font-[13px] cursor-pointer"
            onClick={() => {
              toggleSubReply();
            }}
          >
            Reply
          </button>
        </div>

        {nestedReply ? (
          <div className="w-full mb-3">
            <input
              value={replyContent}
              onChange={handleReplyChange}
              placeholder="Write your reply..."
              className="w-full border mt-2 p-2 outline-none rounded-md resize-none"
              type="text"
              ref={inputRef}
            />

            <button
              onClick={toggleSubReply}
              className="mt-2 px-4 py-2 mr-3 border border-[#B6CC37] text-[#B6CC37]  rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleReplySubmit}
              className="mt-2 mr-5 px-4 py-2  text-white rounded"
              style={{ backgroundColor: "rgba(182, 204, 55, 1)" }}
            >
              Submit
            </button>
          </div>
        ) : (
          ""
        )}

        {/* {commentReply ? (
      <div className="xs:ml-10 ml-6 mt-5 w-full">
        {replies.map((item, index) => (
          <Reply item={item} key={index} />
        ))}
      </div>
    ) : (
      ""
    )} */}
      </div>
    </div>
  );
};

export default React.memo(Replies);
