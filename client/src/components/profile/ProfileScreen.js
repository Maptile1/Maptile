import { BsMapFill, BsFillPuzzleFill } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import TilesetCard from "../card/TilesetCard";
import Sidebar from "../sidebar/Sidebar";

const ProfileScreen = (props) => {
  return (
    <div class="grid grid-cols-10 grid-rows-10 gap-4">
      <Sidebar />
      <div class="col-start-2 col-span-2 row-start-3 text-white text-center">

        <div class="text-6xl mb-8">  @Joe Schmo</div>

        <img
          class="w-full h-3/4 object-cover object-center"
          src="https://www.colorado.edu/today/sites/default/files/styles/medium/public/article-image/liu_s-photo.jpg?itok=l-mJPK65"
          alt="blog"
        />
        <div class="mt-5">Hi my name is Joe Schmo, I like making games!</div>
      </div>
      <div class="col-start-5 row-start-3 mt-20 text-6xl justify-self-center text-white">
        <BsMapFill />8 Maps
      </div>
      <div class="col-start-7 row-start-3 mt-20 text-6xl justify-self-center text-white">
        <BsFillPuzzleFill />8 Tilesets
      </div>
      <div class="col-start-9 row-start-3 mt-20 text-6xl justify-self-center text-white">
        <BiLike />8 Likes
      </div>
      <div class="mt-20 grid grid-cols-4 col-span-10 col-start-2 row-start-4 gap-5">
        <TilesetCard
          tilename="nice tileset"
          description="awesome tiles for your games"
        />
        <TilesetCard tilename="Ice Tiles" description="perfect tiles for 2D winter theme" />
        <TilesetCard tilename="Fire Tiles" description="perfect tiles for 2D fire theme" />
        <TilesetCard tilename="Space Tiles" description="perfect tiles for 2D space theme" />
      </div>

    </div>
  );
};

export default ProfileScreen;
