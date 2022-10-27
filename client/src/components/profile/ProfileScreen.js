import { BsMapFill, BsFillPuzzleFill } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
const ProfileScreen = (props) => {
  return (
    <div class="grid grid-cols-10 gap-4">
      <div class="col-start-2 col-span-2 row-start-2 text-white text-center">
        Joe Schmo
        <img
          class="lg:h-48 md:h-36 w-full object-cover object-center"
          src="https://dummyimage.com/720x400"
          alt="blog"
        />
        Hi my name is Joe Schmo, I like making games!
      </div>
      <div class="col-start-5 row-start-2 mt-10 text-6xl justify-self-center text-white">
        <BsMapFill />8 Maps
      </div>
      <div class="col-start-7 row-start-2 mt-10 text-6xl justify-self-center text-white">
        <BsFillPuzzleFill />8 Tilesets
      </div>
      <div class="col-start-9 row-start-2 mt-10 text-6xl justify-self-center text-white">
        <BiLike />8 Likes
      </div>
    </div>
  );
};

export default ProfileScreen;
