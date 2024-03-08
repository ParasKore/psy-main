import React, { useState, useRef } from "react";
//Library
import { toast } from "react-toastify";
import { Button } from "antd";
//Utility Functions
import { login } from "../../redux/Slice/userSlice";
import { useDispatch } from "react-redux";
import { PostApi } from "../../lib/axios-api";

function UploadBanner() {
  const BannerImageInput = useRef(null);
  const [banner, setBanner] = useState(null);
  const dispatch = useDispatch();

  const Upload = async (e) => {
    e.preventDefault();

    let fd = new FormData();
    fd.append("banner", banner);

    if (banner != null) {
      const res = await PostApi("upload-banner", fd);

      if (res && res.message == "banner updated") {
        toast.success("Banner uploaded successfully!!");
        const token = JSON.parse(localStorage.getItem("token"));

        dispatch(login({ user: res.data, token: token }));

        console.log();

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Something went wrong!!");
      }

      console.log("res", res);
    } else {
      toast.error("Please select image!!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {banner ? (
        <>
          <img
            src={URL.createObjectURL(banner)}
            alt="bannerimg"
            className="w-auto h-auto"
          />
        </>
      ) : (
        <div className={"border-dashed border-2 border-[#979797] rounded-[8px] text-center h-[300px] " + (window.innerWidth <= "975" ? 'w-[320px]' : 'w-[360px]')}>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            className="hidden"
            id="banner"
            ref={BannerImageInput}
            onChange={(e) => {
              setBanner(e.target.files[0]);
            }}
          />
          <label
            htmlFor="banner"
            onClick={() => BannerImageInput.current.click()}
            className="text-black font-[700] text-[1.25em] inline-block leading-[300px]"
          >
            Choose a file
          </label>
        </div>
      )}
      <Button
        style={{
          backgroundColor: "rgb(182, 204, 55)",
          border: "none",
          color: "black",
        }}
        onClick={Upload}
        className="xs:px-3 w-32 mt-3 font-bold xs:py-2 rounded-3xl h-11"
      >
        Upload
      </Button>
    </div>
  );
};

export default React.memo(UploadBanner);