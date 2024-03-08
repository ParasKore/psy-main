import React, { useEffect, useState } from "react";
//Svg
import SearchOutline from "../Assets/svg/search-lg.svg";
//Library
import { PostApi } from "../lib/axios-api";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
//Utility Functions
import { GetHost } from "../lib/get-data";
//Assets
import search from "../Assets/animations/search.json";
import noSearchResult from "../Assets/animations/no_search_result.json";
//Compoents
import Suggestions from "../Components/LayoutComponents/Suggestions";

const Search = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });
  const [searchVal, setSearchVal] = useState("");
  const [results, setResults] = useState(false);
  const navigate = useNavigate();

  const Search = async () => {
    const data = await PostApi("search", {
      user_name: searchVal,
    });
    console.log(data.data);
    if (data && data.message == "results found") {
      setResults(data.data);
    }
  };

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    window.addEventListener("resize", changeWindowSize);

    return () => {
      window.removeEventListener("resize", changeWindowSize);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      Search();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchVal]);

  return (
    <div className="w-full overflow-y-hidden">
      <div className="p-2">
        <div className="bg-gray-100 p-2 rounded-md flex">
          <img src={SearchOutline} alt="" width="20" />
          <input
            type="text"
            name=""
            id=""
            className="w-full bg-transparent focus:outline-none px-2"
            placeholder="Search by doctors name"
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
          />
        </div>
      </div>
      <div className=" sm:h-[100vh] h-[85vh] overflow-y-auto pb-15">
        {searchVal === "" ? (
          <>
            <div className="flex flex-col h-2/6 sm:h-4/6 mb-16 justify-center items-center">
              <Lottie animationData={search} loop={true} />
              <p className="text-[18px] text-center mx-4 -mt-2 text-[#373737]">
                Connect with psychiatrists all around the globe!
              </p>
            </div>
            {windowSize.width <= "975" ? <div className="mb-40"><Suggestions /></div> : ""}
          </>
        ) : results ? (
          results.map((items, index) => {
            return (
              <div
                key={index}
                onClick={() =>
                  navigate(`/user/${items.user_name}`, {
                    state: { username: items.user_name },
                  })
                }
                className="p-3 cursor-pointer rounded-[12px] flex justify-start drop-shadow-sm bg-white my-2"
              >
                <div className="flex gap-3">
                  <img
                    className="rounded-[50%] w-auto h-12"
                    src={GetHost() + "server/profile/" + items.profile}
                    alt=""
                  />
                  <div className="flex cursor-pointer flex-col">
                    <p className="text-black text-[1em]">{items.user_name}</p>
                    <p className="text-sm">{items.about}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col h-4/6 justify-center items-center">
            <Lottie animationData={noSearchResult} loop={true} />
            <p className="text-[22px] text-[#373737]">No Results Found!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
