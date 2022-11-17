import Sidebar from "../sidebar/Sidebar";
import {FaHeart, FaClock, FaChartLine} from "react-icons/fa";
import {React, useState, useEffect, useRef} from "react";
import TopPostCard from "../card/TopPostCard";
import RecentCard from "../card/RecentCard";

const Home = (props) => {
    //const nav = useNavigate();
    const [topSlides, setTopSlides] = useState([
        {name: "slide1", color: "maptile-green"},
        {name: "slide2", color: "orange"},
        {name: "slide3", color: "yellow"},
        {name: "slide4", color: "green"},
        {name: "slide5", color: "blue"},
        {name: "slide6", color: "purple"},
        {name: "slide7", color: "purple"},
        {name: "slide8", color: "purple"},
        {name: "slide9", color: "purple"},
        {name: "slide10", color: "purple"}
    ]);
    const [recent, setRecent] = useState([
        {name: "Bone Zone", color: "maptile-green"},
        {name: "Test2", color: "orange"},
        {name: "Test3", color: "yellow"},
        {name: "Test4", color: "green"},
        {name: "Test6", color: "blue"}
    ]);
    const [topSlideIndex, setTopSlideIndex] = useState(0);
    const timeoutRef = useRef(null)

    const resetTimeout = () => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(()=>{
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => 
                setTopSlideIndex((prevIndex) =>
                    prevIndex === 4 ? 0 : prevIndex + 1
                ),
            10000
        );
        return()=> {
            resetTimeout();
        };
    }, [topSlideIndex, topSlides.length])

    // ! Probably gonna delete this, keeping just in case
    // const handleClick = (e) => {
    //     const {id} = e.currentTarget;
    //     if (id === "home-Tileset") {
    //         nav("/user_tilesets");
    //     }
    //     if (id === "home-Map") {
    //         nav("/user_maps");
    //     }
    //     if (id === "home-Search") {
    //         nav("/search");
    //     }
    //     if (id === "home-Profile") {
    //         nav("/user_profile");
    //     }
    //     if (id === "toptileset") {
    //         nav("/tilesetdisplay");
    //     }
    //     if (id === "topmap") {
    //         nav("/mapdisplay");
    //     }
    // };

    return (
        <div>
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
                    <div className="bg-maptile-background-mid w-full h-1/3 rounded-3xl z-30 overflow-hidden relative space-y-2">
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
                        
                        <div className="flex flex-row relative bottom-[300px] w-full h-2/3 justify-start transition-transform ease-in-out duration-1000" style={{transform: `translate3d(${-topSlideIndex * 100}%,0,0)`}}>
                            {topSlides.map((slide, i) => {
                                if (i % 2 === 0) {
                                    return (
                                        <div className="flex flex-row w-full h-full space-x-5 justify-center flex-shrink-0">
                                            <TopPostCard name={slide.name} color={slide.color} />
                                            <TopPostCard name={topSlides[i + 1].name} color={topSlides[i + 1].color} />
                                        </div>
                                    );
                                } else {
                                    return "";
                                }
                            })}
                        </div>
                        <div className="w-full h-[10px] flex flex-row relative justify-center space-x-1 bottom-[300px]">
                            {topSlides.map((_, i) => {
                                if (i % 2 === 0) {
                                    return <div className={`w-[10px] h-[10px] inline-block rounded-full cursor-pointer ${topSlideIndex === i / 2 ? "bg-gradient-to-br from-maptile-green to-maptile-green-alt" : "bg-[#9a9a9a]"}`} onClick={() => setTopSlideIndex(i / 2)}></div>;
                                } else {
                                    return "";
                                }
                            })}
                        </div>
                    </div>
                    <div className="flex flex-row z-30 w-full h-2/3 space-x-[50px]">
                        <div className="bg-maptile-background-mid w-1/2 rounded-3xl z-30 overflow-hidden">
                            <div className="bg-gradient-to-br from-maptile-green to-maptile-green-alt w-full drop-shadow-lg bg-fixed rounded-t-3xl header-card">
                                <div className="text-white text-4xl shadow-2xl pt-2.5 pl-4 text-shadow-lg h-full w-full flex flex-row">
                                    Recent
                                    <FaClock className="ml-3 mt-1" />
                                </div>
                            </div>
                            <div className="flex flex-col flex-shrink-0 w-full rl-scroll-card space-y-3 overflow-y-scroll no-scrollbar">
                                {recent.map((item)=>{
                                    return(
                                        <RecentCard name={item.name}/>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="bg-maptile-background-mid w-[50%] rounded-3xl z-30 overflow-hidden">
                            <div className="bg-gradient-to-tr from-maptile-green-alt to-maptile-green w-full drop-shadow-lg header-card">
                                <div className="text-white text-4xl shadow-2xl pt-2.5 pl-4 text-shadow-lg h-full w-full flex flex-row">
                                    Liked
                                    <FaHeart className="ml-3 mt-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
