import { BsMapFill, BsFillPuzzleFill } from "react-icons/bs";
import { BiLike, BiCog } from "react-icons/bi";
import TilesetCard from "../card/TilesetCard";
import Sidebar from "../sidebar/Sidebar";
import MapCard from "../card/MapCard";
import { React, useState, useEffect } from "react";
import ProfileEditModal from "./ProfileEditModal";
import { Navigate, useLocation, useNavigate} from "react-router-dom";
// import { isRouteErrorResponse } from "react-router-dom";
import Axios from "axios";

Axios.defaults.withCredentials = true;

const ProfileScreen = (props) => {
  const [modalOpen, setProfileModal] = useState(false);

  const location = useLocation();
  const [user, setUser] = useState(props.user);
  const [userTilesets, setUserTilesets] = useState(null);
  const [userMaps, setUserMaps] = useState(null);


  const [userPfp, setPfp] = useState(null);
  const nav = useNavigate();

  const updatePfp = (newImage) => {
    setPfp(newImage + "?=" + Math.random().toString().substring(2));
  };

  useEffect(() => {
    const getData = async () => {
      if(props.user == null){
        await Axios.get(
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
      await Axios.get(
        "https://maptile1.herokuapp.com/tileset/getUser/" + props.user._id)
      .then(response => {
        setUserTilesets(response.data.usertilesets);
      })
      .catch(err => console.log(err));

      await Axios.get("https://maptile1.herokuapp.com/user/get/" + props.user._id)
      .then(response => {
          setUser(response.data.user)
          setPfp(
            "https://maptilefiles.blob.core.windows.net/maptile-profile-images/" +
            response.data.user._id +
            "?=" +
            Math.random().toString().substring(2)
          )
      })
      .catch(err => console.log(err));
      await Axios.get("https://maptile1.herokuapp.com/map/getUser/" + props.user._id)
      .then(response => {
        console.log("USER MAPS:", response.data.userMaps)
        setUserMaps(response.data.userMaps)
      })
      .catch(err => console.log(err))
    };
    getData();
  }, [props.user]);

  // if(!props.user){
  //   return <Navigate to="/" replace state={{ from: location }} />
  // }
  return user && userTilesets && userMaps ? (
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
          <div class="col-start-6 row-start-4 col-span-5 mt-[-30px]">
            <button
              className="w-full p-2 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl"
              onClick={() => setProfileModal(true)}
            >
              <BiCog size={30} className="text-white mt-[8px]" />
              <div className="text-center text-white font-bold text-3xl mt-[-30px]">
                {" "}
                Settings{" "}
              </div>
            </button>
          </div>
          <div class="col-start-6 row-start-3 mt-20 text-6xl justify-self-center text-white">
            <BsMapFill />
            <div class="mt-10">{user.maps.filter(n => n).length}</div>
            <div class="mt-4">Maps</div>
          </div>
          <div class="col-start-8 row-start-3 mt-20 text-6xl justify-self-center text-white">
            <BsFillPuzzleFill />
            <div class="mt-10">{userTilesets.filter(n => n).length}</div>
            <div class="mt-4">Tilesets</div>
          </div>
          <div class="col-start-10 row-start-3 mt-20 text-6xl justify-self-center text-white">
            <BiLike />
            <div class="mt-10">{user.likes}</div>
            <div class="mt-4">Likes</div>
          </div>
          <div class="row-start-4 text-white text-3xl col-start-2 pt-10 mt-10">
            Featured
          </div>
          <div
            class="row-start-5 text-white text-3xl col-start-2 col-span-10"
            style={{ borderTop: "2px solid #fff ", marginRight: 20 }}
          ></div>
          <div class="mt-10 grid grid-cols-4 col-span-10 col-start-2 row-start-7 gap-5">
            {
              userTilesets.filter(n => n).map((obj) => {
                 return (
                  <TilesetCard
                    key={obj}
                    name={obj.name}
                    description={obj.description}
                    owner={obj.owner}
                    _id={obj._id} />
                  )
              })              
            }
            {
              userMaps.filter(n => n).map((obj) => {
                  return (
                    <MapCard
                      key={obj}
                      name={obj.name}
                      description={obj.description}
                      owner={obj.owner}
                      _id={obj._id} />
                  )
              })
            }
            </div>
        <ProfileEditModal
            user={props.user}
            modalOpen={modalOpen}
            setProfileModal={setProfileModal}
            updateUser={props.setTheUser}
            updatePfp={updatePfp}
          />
    </div>
  ) : null;
};

export default ProfileScreen;
