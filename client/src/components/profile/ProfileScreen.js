import { BsMapFill, BsFillPuzzleFill } from "react-icons/bs";
import { BiLike, BiCog } from "react-icons/bi";
import TilesetCard from "../card/TilesetCard";
import Sidebar from "../sidebar/Sidebar";
import MapCard from "../card/MapCard";
import { React, useState } from "react";
import ProfileEditModal from "./ProfileEditModal";
// import { isRouteErrorResponse } from "react-router-dom";

const ProfileScreen = (props) => {
  const [modalOpen, setProfileModal] = useState(false);
  var user = props.user;
  console.log(user);
  return (
    <div class="grid grid-cols-10 grid-rows-10 gap-4">
      <Sidebar setTheUser={props.setTheUser} />

      <div class="col-start-2 col-span-2 row-start-3 text-white text-center">
        <div class="text-3xl mb-8"> {user.userName}</div>

        <img
          class="w-full h-3/4 object-cover object-center"
          src="https://www.colorado.edu/today/sites/default/files/styles/medium/public/article-image/liu_s-photo.jpg?itok=l-mJPK65"
          alt="blog"
        />
        <div class="mt-5">{user.bio}</div>
        <button
          className="mt-5 flex flex-row p-2 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl"
          onClick={() => setProfileModal(true)}
        >
          <BiCog />
          <div className="ml-2 mt-[-4px]"> Settings </div>
        </button>
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
      <ProfileEditModal
        user={props.user}
        modalOpen={modalOpen}
        setProfileModal={setProfileModal}
        updateUser={props.setTheUser}
      />

    </div>
  );
};

export default ProfileScreen;
