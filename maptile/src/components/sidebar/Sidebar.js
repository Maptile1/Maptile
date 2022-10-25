import { AiFillHome } from "react-icons/ai";
import {
  BsFillPuzzleFill,
  BsMapFill,
  BsSearch,
  BsFillPersonBadgeFill,
  BsPower,
} from "react-icons/bs";
const Sidebar = (props) => {
  return (
    <aside class="w-64" aria-label="Sidebar">
      <div class="overflow-y-auto py-4 px-3 bg-maptile-green rounded dark:bg-maptile-green">
        <ul class="space-y-2">
          <li>
            <span class="ml-3">Maptile ICON HERE</span>
          </li>
          <li>
            <button
              class="hover:bg-green-200"
              onClick={() => props.handleHomeView()}
            >
              <AiFillHome />
            </button>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <button onClick={() => props.handleTilesetView()}>
                {" "}
                <BsFillPuzzleFill />
              </button>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <button onClick={() => props.handleMapView()}>
                <BsMapFill />
              </button>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <button onClick={() => props.handleSearchView()}>
                <BsSearch />
              </button>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <button onClick={() => props.handleProfileView()}>
                <BsFillPersonBadgeFill />
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
                <BsPower />
              </button>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
