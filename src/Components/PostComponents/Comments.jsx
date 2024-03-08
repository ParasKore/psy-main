import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
//Utility Functions
import { GetHost } from "../../lib/get-data";
import { PostApi } from "../../lib/axios-api";
//Components
import Replies from "./Replies";
import AddReply from "./AddReply";
//Assets
import SendSvg from "../../Assets/svg/send.svg";

const Comments = ({ postId, user, setCommentsCount }) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchComments = async () => {
    console.log("page", page);
    try {
      const res = await PostApi(`fetch-comments?page=${page}`, {
        post_id: postId,
      });

      console.log("res", res);

      if (res) {
        if (res.message == "comments found") {
          if (res.data.length != 0) {
            if (res.data.next_page_url == null) {
              setHasMore(false);
            }
            setPage(page + 1);
            setComments([...comments, ...res.data.data]);
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
    fetchComments();
  }, []);

  const postComment = async (comment) => {
    try {
      const res = await PostApi("add-comment", {
        user_id: user.id,
        post_id: postId,
        content: comment,
      });

      if (res && res.message == "comment added successfully") {
        toast.success("Comment Added!!");

        const newComment = [
          {
            user: {
              user_name: user.user_name,
              profile: user.profile,
            },
            id: res.data.id,
            content: comment,
            human_readable_created_at: "1 sec ago",
          },
        ];

        setComment("");
        setComments([...newComment, ...comments]);
        setCommentsCount();
      } else {
        toast.error("Something went wrong!!");
      }
      console.log(res);
    } catch (error) {
      toast.error("Something went wrong!!");
      console.log("error", error);
    }
  };

  return (
    <div>
      {user != null ? (
        <>
          <div className="py-2 flex justify-between items-center px-4 w-full bg-gray-100 rounded-[1em] mb-4">
            <input
              type="text"
              placeholder="Lets Discuss...."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={
                "w-full h-auto rounded-[1em] pl-1 bg-gray-100 outline-none text-[16px] py-1 "
              }
            />
            <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-[50%]">
              <img
                onClick={() => postComment(comment)}
                src={SendSvg}
                alt="send"
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      {comments.map((item) => {
        return (
          <Comment key={item.id} postId={postId} user={user} comment={item} />
        );
      })}

      {comments.length > 0 && hasMore ? (
        <div onClick={fetchComments} className="text-sm text-center">
          Load more
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export const Comment = ({ postId, user, comment }) => {
  const [replies, setReplies] = useState(false);
  const [commentReply, setcommentReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [newReply, setNewReply] = useState(null);
  const wordLimit = 40;
  const inputRef = useRef(null);

  const repliesToggle = () => {
    setcommentReply(!commentReply);
  };

  useEffect(() => {
    if (commentReply != false) {
      setReplyContent(`@${comment.user.user_name} `);
      inputRef.current.focus();
    } else {
      setReplyContent("");
    }
  }, [commentReply]);

  const toggleReply = () => {
    setReplies(!replies);
  };

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
    const words = e.target.value.trim().split(/\s+/);
    if (words.length > wordLimit) {
      setReplyContent(words.slice(0, wordLimit).join(" "));
    }
  };

  const handleReplySubmit = async () => {
    console.log("replyContent", replyContent);
    console.log("user.id", user.id);
    console.log("postId", postId);
    console.log("comment.id", comment.id);
    if (replyContent == "") {
      toast.error("You have not written anything!");
    } else {
      const newReply = await AddReply(
        user,
        postId,
        comment.id,
        null,
        replyContent
      );
      setNewReply(newReply);
    }
  };

  return (
    <div className="flex items-start mb-4 text-sm">
      <img
        src={GetHost() + "server/profile/" + comment.user.profile}
        alt={`${comment.user.user_name}'s profile`}
        className="w-8 h-8 rounded-full mr-4"
      />
      <div className="flex flex-col">
        <div className="flex items-center mb-1">
          <a
            href={"/user/" + comment.user.user_name}
            className="font-bold mr-2"
          >
            {comment.user.user_name}
          </a>
          <span className="text-gray-500">
            {comment.human_readable_created_at}
          </span>
        </div>
        <p className="text-black">{comment.content}</p>
        <div className="flex flex-row">
          <h4
            className="text-[#6C757D] mt-1 font-[13px] cursor-pointer"
            onClick={repliesToggle}
          >
            Reply
          </h4>
          {comment.nested_replies_count > 0 ? (
            <button
              onClick={toggleReply}
              className="rounded-full  text-[#6C757D] mt-1 font-[13px] ml-4 "
            >
              See replies
            </button>
          ) : (
            ""
          )}
        </div>

        {commentReply ? (
          <div className="w-full">
            <input
              value={replyContent}
              onChange={handleReplyChange}
              placeholder="Write your reply..."
              className="w-full border mt-2 p-2 outline-none rounded-md resize-none"
              type="text"
              ref={inputRef}
            />

            <button
              onClick={repliesToggle}
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

        {replies ? (
          <Replies commentId={comment.id} newReply={newReply} postId={postId} user={user} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default React.memo(Comments);
