import React from "react";
//Library
import { Button } from "antd";
import Lottie from "lottie-react";
//Assets
import notFound from "../Assets/animations/not_found.json";

export default function PageNotFound() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <Lottie className="w-full xs:w-5/6 md:w-6/12" animationData={notFound} loop={true} />

        <a href="/">
          <Button>Back Home</Button>
        </a>
      </main>
    </>
  );
}
