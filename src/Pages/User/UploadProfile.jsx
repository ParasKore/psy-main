import React, { useState } from "react";
import Avatar from "react-avatar-edit";
import { Button } from "antd";
import { PostApi } from "../../lib/axios-api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../redux/Slice/userSlice";

function UploadProfile() {
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (view) => {
    setPreview(view);
  };

  const Upload = async (e) => {
    e.preventDefault();

    if (preview != null) {
      const res = await PostApi("upload-profile", {
        profile: preview,
      });

      if (res && res.message == "profile updated") {
        toast.success("Profile uploaded successfully!!");
        const token = JSON.parse(localStorage.getItem("token"));

        dispatch(login({ user: res.data, token: token }));

        console.log();

        setTimeout(() => {
          window.location.reload();
        }, 2000);

        console.log("res", res);
      } else {
        toast.error("Something went wrong!!");
      }
    } else {
      toast.error("Please select image!!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Avatar
        width={windowSize.width <= "975" ? 320 : 360}
        height={300}
        onCrop={onCrop}
        onClose={onClose}
        src={src}
      />
      <Button
        style={{
          backgroundColor: "rgb(182, 204, 55)",
          border: "none",
          color: "black",
        }}
        onClick={Upload}
        className="xs:px-3 mt-3 font-bold xs:py-2 rounded-3xl w-32 h-11"
      >
        Upload
      </Button>
    </div>
  );
};

export default React.memo(UploadProfile);
