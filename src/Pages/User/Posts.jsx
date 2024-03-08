import React, { useState, useEffect } from "react";
//Components
import Post from "../../Components/PostComponents/Post";
import Loader from "../../Components/Loader";
//Library
import { PostApi } from "../../lib/axios-api";
import Lottie from "lottie-react";
import InfiniteScroll from "react-infinite-scroll-component";
//Assets
import NoResults from "../../Assets/animations/no_result.json";

function Posts({ userData }) {
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

    const res = await PostApi(`user-posts?page=${page}`, {
      user_id: userData.profile.id,
    });
    console.log("postdata", res);

    setData(res);
  };

  console.log("posts", posts);

  useEffect(() => {
    fetchData();
    console.log('userData', userData);
  }, [userData]);

  const renderPost = () => {
    return posts.map((item, key) => {
      return <Post key={key} data={item} />;
    });
  };

  if (loading) {
    return <Loader half="half" />;
  } else {
    return (
      <>
        <main className="flex justify-center">
          <div
            id="scrollParentRef"
            className="w-full justify-center gap-4 h-[100vh] pb-40"
          >
            <div className="w-full flex justify-center">
              <div className="w-full p-1 justify-center overflow-y-auto h-[full]">
                {posts && posts.length > 0 && posts != "no posts" ? (
                  <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollParentRef"
                  >
                    {renderPost()}
                  </InfiniteScroll>
                ) : (
                  <div className="w-full z-0 relative mt-0 xs:-mt-6 flex-col flex justify-center items-center">
                    <div className="flex z-50 absolute top-0 w-full flex-col justify-center items-center">
                      <h2 className="text-black -mb-20 xs:-mb-32 font-bold text-xl">
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
};

export default React.memo(Posts);