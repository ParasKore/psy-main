import React from "react";
import Lottie from "lottie-react";
import loading from "../../Assets/animations/loading.json";

function index({ half }) {
  return (
    <div
      className={half ? 'pt-[25px]' : "pt-[200px]"}
      style={{
        width: "100%",
        height: half ? "5vh" : "65vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie className="w-44 md:w-60" animationData={loading} loop={true} />
    </div>
  );
};

export default React.memo(index);
