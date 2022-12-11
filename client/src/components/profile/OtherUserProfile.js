import { BsMapFill, BsFillPuzzleFill } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import TilesetCard from "../card/TilesetCard";
import Sidebar from "../sidebar/Sidebar";
// import MapCard from "../card/MapCard";
import { React, useState, useEffect } from "react";
import { Navigate, useLocation, useParams, useNavigate } from "react-router-dom";
// import { isRouteErrorResponse } from "react-router-dom";
import Axios from "axios";
import MapCard from "../card/MapCard";

Axios.defaults.withCredentials = true

const OtherUserProfile = (props) => {

    const {id} = useParams();
    const location = useLocation();
    const [user, setUser] = useState(null);
    var [userTilesets, setUserTilesets] = useState([]);
    const [userMaps, setUserMaps] = useState([]);
    const [userPfp, setPfp] = useState("");
    const nav = useNavigate();

    const updatePfp = (newImage) => {
        console.log(newImage);
        setPfp(newImage + "?=" + Math.random().toString().substring(2));
    };

    useEffect(() => {
        if(props.user == null){
            Axios.get(
              "https://maptile1.herokuapp.com/user/loggedin"
            )
            .then((response) => {
              console.log("LOGGED IN USER:", response.data)
              if (response.data.user !== undefined){
                props.setTheUser(response.data.user)
              }
              else{
                nav("/", { replace: true })
              }
            })
            .catch((err) => {
              console.log(err)
            });
          }
        const getUser = async () => {
            await Axios.get("https://maptile1.herokuapp.com/user/get/" + id)
            .then(response => {
                setUser(response.data.user);
                console.log("USER:", response.data.user)
            })
        };
        getUser();
        const getTilesets = async () => {
            await Axios.get("https://maptile1.herokuapp.com/tileset/getUser/" + id)
            .then(response => {
                setUserTilesets(response.data.usertilesets);
                setPfp("https://maptilefiles.blob.core.windows.net/maptile-profile-images/" +
                id +
                "?=" +
                Math.random().toString().substring(2))
                console.log(response.data.usertilesets)
            });
        }
        getTilesets();
        const getMaps = async () => {
            await Axios.get("https://maptile1.herokuapp.com/map/getUser/" + id)
            .then(response => {
                setUserMaps(response.data.userMaps)
            })
      .catch(err => console.log(err))
       }
       getMaps();
    }, [id]);

    // if(!location.state.owner){
    //     return <Navigate to="/" replace state={{ from: location }} />
    // }
    return user && userTilesets && userMaps ? (
        <div>
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
                            userTilesets.filter(n => n).map((obj, index) => 
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
                        {
                        userMaps.filter(n => n).map((obj) => 
                        {
                            return (
                                <MapCard
                                    key={obj}
                                    name={obj.name}
                                    description={obj.description}
                                    owner={obj.owner}
                                    _id={obj._id}
                                    />
                                )
                            }
                            ) 
                        }
                    </div>
                </div>
            )
        </div>
    ) : (
        null
    );
};

export default OtherUserProfile;
