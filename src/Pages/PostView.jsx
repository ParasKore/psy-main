import React, { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import Post from "../Components/PostComponents/Post";
import Helmet from "../Helmet";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { PostApi } from "../lib/axios-api";

export default function PostView() {
  const { postid } = useParams();
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    try {
      const res = await PostApi(`post`, {
        uuid: postid,
      });
      console.log("postdata", res);

      if (res && res.message == "found") {
        setPost(res.data[0]);
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (error) {
      toast.error("Something went wrong!!");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postid]);

  if (post == null) {
    return <Loader />;
  } else {
    return (
      <div className="overflow-y-scroll h-[100vh] pb-40">
        <Helmet page={`post/${postid}`} desc={post.content.substring(0,150)} />
        <Post data={post} />
      </div>
    );
  }
}
