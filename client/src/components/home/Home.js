import Sidebar from "../sidebar/Sidebar";
import { FaHeart, FaClock, FaChartLine } from "react-icons/fa";
import { React, useState, useEffect, useRef } from "react";
import TopPostCard from "../card/TopPostCard";
import RecentCard from "../card/RecentCard";
import Axios from "axios";

const Home = (props) => {
  //const nav = useNavigate();
  const [recent, setRecent] = useState([]);
  const [topTilesets, setTopTilesets] = useState(null); // gonna have to be changed to maps as well in the future
  const [topSlideIndex, setTopSlideIndex] = useState(0);
  const timeoutRef = useRef(null);
  const [loading, setloading] = useState(true);
  const [likedTilesets, setLikedTilesets] = useState(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    const topRes = async () => {
      setloading(true);
      var user;
      await Axios.get("https://maptile1.herokuapp.com/tileset/top").then(
        (response) => {
          console.log(response.data.tilesets);
          setTopTilesets(response.data.tilesets);
        }
      );
      await Axios.get(
        "https://maptile1.herokuapp.com/user/getRecent/" + props.user._id
      ).then((response) => {
        setRecent(response.data.recent);
      });
      await Axios.get(
        "https://maptile1.herokuapp.com/user/get/" + props.user._id
      ).then((response) => {
        user = response.data.user;
        props.setTheUser(response.data.user);
      });
      await Axios.post("https://maptile1.herokuapp.com/tileset/getBatch", {
        ids: user.liked_tilesets,
        limit: 10,
        page: 0,
        fields: "_id name owner description",
      }).then((response) => {
        console.log(response.data.tilesets);
        setLikedTilesets(response.data.tilesets);
      });
      setloading(false);
    };
    topRes();
  }, []);
  console.log(recent);
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setTopSlideIndex((prevIndex) => (prevIndex === 4 ? 0 : prevIndex + 1)),
      10000
    );
    return () => {
      resetTimeout();
    };
  }, [topSlideIndex]);

  return (
    <div>
      {!loading && (
        <div className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <Sidebar setTheUser={props.setTheUser} />
          <div className="container px-6 py-10 mx-auto w-screen h-screen space-y-5 select-none">
            {/* <h1 class="text-3xl font-semibold text-white capitalize lg:text-4xl dark:text-white">On Maptile</h1> */}
            <div className="bg-maptile-background-mid w-full h-2/5 rounded-3xl z-30 overflow-hidden relative space-y-2">
              <div className="bg-gradient-to-br from-maptile-green to-maptile-green-alt w-full h-[64px] drop-shadow-lg">
                <div className="text-white text-4xl shadow-2xl pt-2.5 pl-4 text-shadow-lg h-full w-full flex flex-row">
                  Top Posts
                  <FaChartLine className="ml-3 mt-1" />
                </div>
              </div>
              <div className="relative flex flex-row w-full">
                <div className="w-[100px] h-[300px] bottom-2 relative z-40 bg-gradient-to-r from-maptile-background-mid"></div>
                <div className="w-[100px] h-[300px] left-[1288px] bottom-2 relative z-40 float-right bg-gradient-to-l from-maptile-background-mid"></div>
              </div>

              <div
                className="flex flex-row relative bottom-[290px] w-full h-2/3 justify-start transition-transform ease-in-out duration-1000"
                style={{
                  transform: `translate3d(${-topSlideIndex * 100}%,0,0)`,
                }}
              >
                {topTilesets.map((slide, i) => {
                  if (i % 2 === 0) {
                    return (
                      <div className="flex flex-row w-full h-full space-x-16 justify-center flex-shrink-0">
                        <TopPostCard
                          _id={slide._id}
                          name={slide.name}
                          owner={slide.owner}
                          dislikes={slide.dislikes}
                          likes={slide.likes}
                        />
                        <TopPostCard
                          _id={topTilesets[i + 1]._id}
                          dislikes={topTilesets[i + 1].dislikes}
                          name={topTilesets[i + 1].name}
                          owner={topTilesets[i + 1].owner}
                          likes={topTilesets[i + 1].likes}
                        />
                      </div>
                    );
                  } else {
                    return "";
                  }
                })}
              </div>
              <div className="w-full h-[10px] flex flex-row relative justify-center space-x-1 bottom-[290px]">
                {topTilesets.map((_, i) => {
                  if (i % 2 === 0) {
                    return (
                      <div
                        className={`w-[10px] h-[10px] inline-block rounded-full cursor-pointer ${
                          topSlideIndex === i / 2
                            ? "bg-gradient-to-br from-maptile-green to-maptile-green-alt"
                            : "bg-[#9a9a9a]"
                        }`}
                        onClick={() => setTopSlideIndex(i / 2)}
                      ></div>
                    );
                  } else {
                    return "";
                  }
                })}
              </div>
            </div>
            <div className="flex flex-row z-30 w-full h-3/5 space-x-[50px]">
              <div className="bg-maptile-background-mid w-1/2 h-full rounded-3xl z-30 overflow-hidden">
                <div className="bg-gradient-to-br from-maptile-green to-maptile-green-alt w-full drop-shadow-lg bg-fixed rounded-t-3xl header-card">
                  <div className="text-white text-4xl shadow-2xl pt-2.5 pl-4 text-shadow-lg h-full w-full flex flex-row">
                    Recent
                    <FaClock className="ml-3 mt-1" />
                  </div>
                </div>
                <div className="flex flex-col mt-5 flex-shrink-0 ml-12 w-5/6 rl-scroll-card space-y-3 overflow-y-scroll no-scrollbar">
                  {recent ? (
                    recent.map((item) => {
                      return (
                        <RecentCard
                          _id={item._id}
                          owner={item.owner}
                          description={item.description}
                          name={item.name}
                        />
                      );
                    })
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className="bg-maptile-background-mid w-[50%] rounded-3xl z-30 overflow-hidden">
                <div className="bg-gradient-to-tr from-maptile-green-alt to-maptile-green w-full drop-shadow-lg header-card">
                  <div className="text-white text-4xl shadow-2xl pt-2.5 pl-4 text-shadow-lg h-full w-full flex flex-row">
                    Liked
                    <FaHeart className="ml-3 mt-1" />
                  </div>
                </div>
                <div className="flex flex-col mt-5 flex-shrink-0 ml-12 w-5/6 rl-scroll-card space-y-3 overflow-y-scroll no-scrollbar">
                  {likedTilesets.map((item) => {
                    return (
                      <RecentCard
                        _id={item._id}
                        owner={item.owner}
                        description={item.description}
                        like={true}
                        name={item.name}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
