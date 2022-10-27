import { AiFillHome } from "react-icons/ai";
import { GiReptileTail } from "react-icons/gi";
import {
  BsFillPuzzleFill,
  BsMapFill,
  BsSearch,
  BsFillPersonBadgeFill,
  BsPower,
} from "react-icons/bs";
const Sidebar = (props) => {
  const iconsize = 30;
  return (
    <aside class="w-40" aria-label="Sidebar">
      <div class="py-5 px-3 bg-maptile-green rounded dark:bg-maptile-green top-0 fixed bottom-0">
        <ul class="space-y-5">
          <li class="pb-5">
            <GiReptileTail size={iconsize} />
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <button
                class="hover:bg-green-200"
                onClick={() => props.handleHomeView()}
              >
                <AiFillHome size={iconsize} />
              </button>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <button onClick={() => props.handleTilesetView()}>
                {" "}
                <BsFillPuzzleFill size={iconsize} />
              </button>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <button onClick={() => props.handleMapView()}>
                <BsMapFill size={iconsize} />
              </button>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <button onClick={() => props.handleSearchView()}>
                <BsSearch size={iconsize} />
              </button>
            </a>
          </li>
          <li class="pt-20">
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <button onClick={() => props.handleProfileView()}>
                <BsFillPersonBadgeFill size={iconsize} />
              </button>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <button>
                {" "}
                <BsPower size={iconsize} />
              </button>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
