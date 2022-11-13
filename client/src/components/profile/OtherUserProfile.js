import { BsMapFill, BsFillPuzzleFill } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import TilesetCard from "../card/TilesetCard";
import Sidebar from "../sidebar/Sidebar";
// import MapCard from "../card/MapCard";
import { React, useState, useEffect } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
// import { isRouteErrorResponse } from "react-router-dom";
import Axios from "axios";

Axios.defaults.withCredentials = true

const OtherUserProfile = (props) => {

    const {id} = useParams();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    var [userTilesets, setUserTilesets] = useState([]);
    const [userPfp, setPfp] = useState(
        "https://maptilefiles.blob.core.windows.net/maptile-profile-images/" +
        location.state.owner +
        "?=" +
        Math.random().toString().substring(2)
    );

    const updatePfp = (newImage) => {
        console.log(newImage);
        setPfp(newImage + "?=" + Math.random().toString().substring(2));
    };

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            await Axios.get("https://maptile1.herokuapp.com/user/get/" + id)
            .then(response => {
                setUser(response.data.user);
                setLoading(false);
            })
        };
        getUser();
        const getTilesets = async () => {
            setLoading(true);
            await Axios.get("https://maptile1.herokuapp.com/tileset/getUser/" + location.state.owner)
            .then(response => {
                setUserTilesets(response.data.usertilesets);
                console.log(response.data.usertilesets)
                setLoading(false);
            });
        }
        getTilesets();
    }, [location.state.owner, id]);

    return location.state.owner ? (
        <div>
            {!loading && (
                <div class="grid grid-cols-12 grid-rows-10 gap-4 ">
                    <Sidebar setTheUser={props.setTheUser} />

                    <div class="col-start-2 col-span-2 row-start-3 text-white text-center ">
                        <div class="text-3xl mb-8 text-center"> {user.userName}</div>

                        <img
                            style={{ borderRadius: 400 / 4 }}
                            class="w-full h-3/4 object-cover object-center border-2 border-maptile-green"
                            src={userPfp}
                            alt="blog"
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                updatePfp(
                                    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                                );
                            }}
                        />
                        <div className="bg-maptile-background-mid mt-8 p2.5 rounded-xl w-full">
                            <div class="mt-5 text-left ml-2">{user.bio}</div>
                        </div>
                    </div>

                    <div class="col-start-6 row-start-3 mt-20 text-6xl justify-self-center gap-10 text-white">
                        <BsMapFill />
                        <div class="mt-10">
                            {user.maps.length}
                        </div>
                        <div class="mt-4">Maps</div>

                    </div>
                    <div class="col-start-8 row-start-3 mt-20 text-6xl justify-self-center text-white">
                        <BsFillPuzzleFill />
                        <div class="mt-10">
                            {user.tilesets.length}
                        </div>
                        <div class="mt-4">Tilesets</div>
                    </div>
                    <div class="col-start-10 row-start-3 mt-20 text-6xl justify-self-center text-white">
                        <BiLike />
                        <div class="mt-10">
                            {user.likes}
                        </div>
                        <div class="mt-4">Likes</div>
                    </div>
                    <div class="row-start-6 text-white text-3xl col-start-2 pt-10 mt-[-10px]">Featured
                    </div>
                    <div class="row-start-7 text-white text-3xl col-start-2 col-span-10" style={{ borderTop: "2px solid #fff ", marginRight: 20 }}></div>
                    <div class="mt-10 grid grid-cols-4 col-span-10 col-start-2 row-start-7 gap-5">
                        {userTilesets.length !== 0 ?
                            userTilesets.map((obj, index) => 
                            {
                                // console.log(obj)
                                return (
                                    <TilesetCard
                                        key={obj}
                                        name={obj.name}
                                        description={obj.description}
                                        owner={obj.owner}
                                        _id={obj._id}
                                    />
                                )
                            }
                            ) 
                            : <div> No tilesets</div>
                        }
                    </div>
                </div>
            )}
        </div>
    ) : (
        <Navigate to="/" replace state={{ from: location }} />
    );
};

export default OtherUserProfile;
