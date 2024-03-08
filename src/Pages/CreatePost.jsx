import React, { useState, useEffect, useRef } from "react";
//Library
import autosize from "autosize";
import { ImCross } from "react-icons/im";
//Utility Functions
import GetUser, { GetHost } from "../lib/get-data";
import { toast } from "react-toastify";
import { PostApi } from "../lib/axios-api";
// import EmojiPicker from "emoji-picker-react";

const CreatePost = () => {
  const textarea = useRef(null);
  const imagesInput = useRef(null);
  const [content, setContent] = useState("");
  const user = GetUser();
  const [images, setImages] = useState([]);
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    autosize(textarea.current);
  }, []);

  const toastUpdate = (id, msg, type) => {
    toast.update(id, {
      render: msg,
      type: type,
      isLoading: false,
      autoClose: 2000,
      draggable: false,
    });
  };

  //Getting images from files
  const uploadImages = (e) => {
    const tempArr = [];

    [...e.target.files].forEach((file) => {
      // console.log("file >>> ", file);

      try {
        tempArr.push({
          data: file,
          url: URL.createObjectURL(file),
        });

        // console.log("pictures >> ", images);
      } catch (error) {
        console.log("uploaderror", error);
      }
    });

    setImages([...images, ...tempArr]);
  };

  //Sending Data to API
  const Post = async (e) => {
    e.preventDefault();

    //Form Data
    let fd = new FormData();
    fd.append("content", content);
    //Images Append
    images.forEach((image) => {
      fd.append("images[]", image.data);
    });

    if (content != "") {
      const id = toast.loading("Postingg...");
      const res = await PostApi("add-post", fd);

      console.log("post", res);

      if (res) {
        if (res.message == "validation error" || "something went wrong") {
          toastUpdate(id, "Seomthing went wrong!!", "error");
        }
        if (res.message == "post created successfully") {
          toastUpdate(id, "Sent for approval!!", "success");

          setTimeout(() => {
            window.location.reload();
          }, 1600);
        }
        if (res.message == "email not verified") {
          toastUpdate(id, "Email not verified!!", "error");
        }
      }
    } else {
      toast.error("Write Something!!");
    }
    console.log("content", content);
  };

  //Removing image from array
  function deleteImage(e) {
    const s = images.filter((item, index) => index !== e);
    setImages(s);
    console.log(s);
  }

  //User Image upload click handle
  const selectImages = () => {
    imagesInput.current.click();
  };

  // const onEmojiClick = (emojiObject) => {
  //   const TextArea = document.getElementById('text-area');

  //   setContent(
  //     content.substr(textarea.current.selectionStart) +
  //       emojiObject.emoji +
  //       content.substr(textarea.current.selectionEnd)
  //   );

  //   console.log('emoji', emojiObject.emoji);
  // };

  return (
    <>
      <div className="w-full h-[100vh] pb-40 overflow-y-auto mt-4 transform -translate-y-5">
        <section className="w-full flex px-3 py-2">
          <div className="mr-1">
            <img
              className="rounded-full h-12 w-12"
              src={GetHost() + "server/profile/" + user.profile}
              alt="Profile Picture"
            />
          </div>
          <div className="flex-1">
            <textarea
              className="w-full p-2 bg-transparent outline-none placeholder-gray-400 text-black resize-none max-h-[300px] xs:max-h-[400px] lg:max-h-[500px] box-border"
              rows="6"
              value={content}
              id="text-area"
              onChange={(e) => setContent(e.target.value)}
              ref={textarea}
              placeholder="Post your Case/Doubt!"
            ></textarea>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 xs:grid-cols-2 lg:gap-4 mb-2">
              {images.length > 0 &&
                images.map((item, index) => {
                  return (
                    <div key={index} className="relative w-auto h-auto">
                      <img
                        src={item.url}
                        className="w-auto h-auto rounded-lg"
                      />
                      <div
                        onClick={() => deleteImage(index)}
                        className="rounded-full cursor-pointer absolute right-1.5 top-1 opacity-40 p-2 bg-slate-300"
                      >
                        <ImCross size="12px" />
                      </div>
                    </div>
                  );
                })}
            </div>
            <input
              type="file"
              id="file"
              ref={imagesInput}
              accept="image/png, image/gif, image/jpeg"
              multiple
              onChange={uploadImages}
              style={{ display: "none" }}
            />
            <div className="flex items-center justify-between pt-2 border-t border-gray-700">
              <div className="flex">
                <svg
                  onClick={selectImages}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-primary hover:text-primary-400 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div className="relative">
                  <svg
                    // onClick={() => setShowEmojiPicker(true)}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-primary hover:text-primary-400 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {/* {showEmojiPicker ? (
                    <div className="absolute -left-16 top-14 xs:-top-8 xs:left-8 sm:left-8 sm:top-0">
                      <EmojiPicker onEmojiClick={onEmojiClick} />
                    </div>
                  ) : (
                    <></>
                  )} */}
                </div>
              </div>
              <div>
                <button
                  onClick={Post}
                  className="transition duration-500 ease-in-out bg-primary bg-opacity-50 hover:bg-opacity-100 text-black hover:text-opacity-100 py-2 px-6 rounded-full text-base font-bold focus:outline-none"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CreatePost;
