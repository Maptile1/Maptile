import { BsMapFill, BsFillPuzzleFill } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import TilesetCard from "../card/TilesetCard";
import Sidebar from "../sidebar/Sidebar";
import MapCard from "../card/MapCard";
import { React, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Axios from 'axios'
const OtherUserProfile = (props) => {
    const location = useLocation();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setUser(location.state.owner)
        const getUser = async () => {
            setLoading(true)
            let response = await Axios.get(
                "https://maptile1.herokuapp.com/user/get/" + location.state.owner)
            setUser(response.data.user)
            setLoading(false);
        }
        getUser()
    }, []);

    return (
        <div>
            {!loading && (<div class="grid grid-cols-10 grid-rows-10 gap-4">
                <Sidebar />

                <div class="col-start-2 col-span-2 row-start-3 text-white text-center">
                    <div class="text-3xl mb-8"> {user.userName}</div>

                    <img
                        class="w-full h-3/4 object-cover object-center"
                        src="https://www.colorado.edu/today/sites/default/files/styles/medium/public/article-image/liu_s-photo.jpg?itok=l-mJPK65"
                        alt="blog"
                    />
                    <div class="mt-5">{user.description}</div>

                </div>

                <div class="col-start-5 row-start-3 mt-20 text-6xl justify-self-center text-white">
                    <BsMapFill />{user.maps.length} Maps
                </div>
                <div class="col-start-7 row-start-3 mt-20 text-6xl justify-self-center text-white">
                    <BsFillPuzzleFill />{user.tilesets.length} Tilesets
                </div>
                <div class="col-start-9 row-start-3 mt-20 text-6xl justify-self-center text-white">
                    <BiLike />{user.likes} Likes
                </div>

                <div class="mt-20 grid grid-cols-4 col-span-10 col-start-2 row-start-4 gap-5">
                    <TilesetCard
                        tilename="nice tileset"
                        description="awesome tiles for your games"
                    />
                    <TilesetCard
                        tilename="Ice Tiles"
                        description="perfect tiles for 2D winter theme"
                    />
                    <MapCard
                        mapname="Fire Map"
                        description="perfect map for your 2D fire map"
                    />
                    <TilesetCard
                        tilename="Space Tiles"
                        description="perfect tiles for 2D space theme"
                    />
                </div>
            </div>)}
        </div>
    );
};

export default OtherUserProfile;
