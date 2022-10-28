import { GiReptileTail } from "react-icons/gi";
import {
  BsFillPuzzleFill,
  BsMapFill,
  BsSearch,
  BsFillPersonBadgeFill,
  BsPower,
  BsFillHouseFill,
} from "react-icons/bs";

const Sidebar = (props) => {
  const iconsize = 30;
  let iconStyles = { color: "white", stroke: "black", strokeWidth: "0.50" };
  return (
    <aside class="w-40" aria-label="Sidebar">
      <div class="py-5 px-3 bg-maptile-green rounded dark:bg-maptile-green top-0 fixed bottom-0">
        <ul class="space-y-10">
          <li class="pb-5">
            <GiReptileTail size={iconsize} style={iconStyles} />
          </li>
          <li>
            <div class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
              <button onClick={() => props.handleHomeView()}>
                {" "}
                <div>
                  <BsFillHouseFill size={iconsize} style={iconStyles} />
                </div>
              </button>
            </div>
          </li>
          <li>
            <div class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
              <button onClick={() => props.handleTilesetView()}>
                {" "}
                <BsFillPuzzleFill size={iconsize} style={iconStyles} />
              </button>
            </div>
          </li>
          <li>
            <div class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
              <button onClick={() => props.handleMapView()}>
                <BsMapFill size={iconsize} style={iconStyles} />
              </button>
            </div>
          </li>
          <li>
            <div class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
              <button onClick={() => props.handleSearchView()}>
                <BsSearch size={iconsize} style={iconStyles} />
              </button>
            </div>
          </li>
          <li class="pt-60">
            <div class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
              <button onClick={() => props.handleProfileView()}>
                <BsFillPersonBadgeFill size={iconsize} style={iconStyles} />
              </button>
            </div>
          </li>
          <li>
            <div class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
              <button onClick={() => props.handleLogOut()}>
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
