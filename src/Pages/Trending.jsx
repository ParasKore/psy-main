import React, { useState, useEffect, useRef } from "react";
//Components
import Post from "../Components/PostComponents/Post";
import Loader from "../Components/Loader";
//Utility Functions
import GetUser from "../lib/get-data";
import { PostApi } from "../lib/axios-api";
//Assets
import NoResults from "../Assets/animations/no_result.json";
import Lottie from "lottie-react";
//Library
import InfiniteScroll from "react-infinite-scroll-component";

export default function Trending() {
  const user = GetUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const setData = (res) => {
    if (res && res.message == "posts found") {
      if (res.data.length != 0) {
        if (res.data.next_page_url == null) {
          setHasMore(false);
        }
        setPosts([...posts, ...res.data.data]);
        setLoading(false);
      } else {
        setPosts("no posts");
        setLoading(false);
      }
    }
  };

  const fetchData = async () => {
    setPage(page + 1);

    const res = await PostApi(`trending-posts?page=${page}`);
    console.log("postdata", res);

    setData(res);
  };

  console.log("posts", posts);

  useEffect(() => {
    fetchData();
  }, [user]);

  const renderPost = () => {
    return posts.map((item, key) => {
      return <Post key={key} data={item} />;
    });
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <main className="flex justify-center">
          <div
            id="scrollParentRef"
            className="w-full overflow-y-auto justify-center gap-4 h-[100vh] pb-40"
          >
            <div className="w-full flex justify-center">
              <div className="w-full p-1 justify-center overflow-y-auto h-[full] md:max-w-[28rem] lg:max-w-[55rem]">
                {posts && posts.length > 0 && posts != "no posts" ? (
                  <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollParentRef"
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                      </p>
                    }
                  >
                    {renderPost()}
                  </InfiniteScroll>
                ) : (
                  <div className="w-full z-0 relative mt-10 flex-col flex justify-center items-center">
                    <div className="flex z-50 absolute top-0 w-full flex-col justify-center items-center">
                      <h2 className="text-black font-bold text-xl">
                        No Posts Found
                      </h2>
                    </div>
                    <Lottie animationData={NoResults} loop={true} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}
