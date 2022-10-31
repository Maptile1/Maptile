import { } from "react-icons/gi";
import {
  BsFillPuzzleFill,
  BsMapFill,
  BsSearch,
  BsFillPersonBadgeFill,
  BsPower,
  BsFillHouseFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Sidebar = (props) => {
  const iconsize = 30;
  let iconStyles = { color: "white", stroke: "white", strokeWidth: "0.50" };
  const nav = useNavigate()

  const handleClick = (e) => {
    const { id } = e.currentTarget
    if(id === "sidebar-Home"){
      nav("/home", {replace: true})
    }
    if(id === "sidebar-Tileset"){
      nav("/user_tilesets")
    }
    if(id === "sidebar-Map"){
      nav("/user_maps")
    }
    if(id === "sidebar-Search"){
      nav("/search")
    }
    if(id === "sidebar-Profile"){
      nav("/user_profile")
    }
    if(id === "sidebar-LogOut"){
      //Log Out Shit goes here, wont actually do anything until we set up auth and whatever.
      nav("/", {replace: true})
    }
  }

  return (
    <aside class="w-40" aria-label="Sidebar">
      <div class="py-5 px-3 bg-maptile-green rounded dark:bg-maptile-green top-0 fixed bottom-0">
        <ul class="space-y-10">
          <li class="w-12 h-12">
            <img src="maptile-logo.png" class="object-fit " alt="logo" />
          </li>
          <li>
            <div name="Home"class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
              <button id="sidebar-Home" onClick={handleClick}>
                {" "}
                <div>
                  <BsFillHouseFill size={iconsize} style={iconStyles} />
                </div>
              </button>
            </div>
          </li>
          <li>
            <div class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
              <button id="sidebar-Tileset" onClick={handleClick}>
                {" "}
                <BsFillPuzzleFill size={iconsize} style={iconStyles} />
              </button>
            </div>
          </li>
          <li>
            <div class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
              <button id="sidebar-Map" onClick={handleClick}>
                <BsMapFill size={iconsize} style={iconStyles} />
              </button>
            </div>
          </li>
          <li>
            <div class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
              <button id="sidebar-Search" onClick={handleClick}>
                <BsSearch size={iconsize} style={iconStyles} />
              </button>
            </div>
          </li>
          <li class="pt-60">
            <div class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
              <button id="sidebar-Profile" onClick={handleClick}>
                <BsFillPersonBadgeFill size={iconsize} style={iconStyles} />
              </button>
            </div>
          </li>
          <li>
            <div class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
              <button id="sidebar-LogOut" onClick={handleClick}>
                <BsPower size={iconsize} style={iconStyles} />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
