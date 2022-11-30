import {} from "react-icons/gi";
import {
  BsFillPuzzleFill,
  BsMapFill,
  BsSearch,
  BsFillPersonBadgeFill,
  BsPower,
  BsFillHouseFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

Axios.defaults.withCredentials = true;

const Sidebar = (props) => {
  const iconsize = 30;
  let iconStyles = { color: "white", stroke: "white", strokeWidth: "0.50" };
  const nav = useNavigate();

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    if (id === "sidebar-Home") {
      nav("/home", { replace: true });
    }
    if (id === "sidebar-Tileset") {
      nav("/user_tilesets");
    }
    if (id === "sidebar-Map") {
      nav("/user_maps");
    }
    if (id === "sidebar-Search") {
      nav("/search");
    }
    if (id === "sidebar-Profile") {
      nav("/user_profile");
    }
    if (id === "sidebar-LogOut") {
      //Log Out Shit goes here, wont actually do anything until we set up auth and whatever.
      var response = Axios.post(
        "https://maptile1.herokuapp.com/user/logout"
      )
      .then((response) => {
        console.log(response)
        props.setTheUser(null);
        nav("/", { replace: true });
      })
      .catch((err) => {
        console.log(err)
        props.setTheUser(null);
        nav("/", { replace: true });
      })   
    }
  };

  return (
    <aside className="w-40 z-10" aria-label="Sidebar">
      <div className="py-5 px-3 bg-maptile-green rounded dark:bg-maptile-green top-0 fixed bottom-0">
        <ul className="space-y-10">
          <div className="w-12 h-12">
            <img src="maptile-logo.png" className="object-fit " alt="logo" />
          </div>
          <div>
            <div
              name="Home"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white "
            >
              <button id="sidebar-Home" onClick={handleClick}>
                {" "}
                <div>
                  <BsFillHouseFill size={iconsize} style={iconStyles} />
                </div>
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
              <button id="sidebar-Tileset" onClick={handleClick}>
                {" "}
                <BsFillPuzzleFill size={iconsize} style={iconStyles} />
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
              <button id="sidebar-Map" onClick={handleClick}>
                <BsMapFill size={iconsize} style={iconStyles} />
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
              <button id="sidebar-Search" onClick={handleClick}>
                <BsSearch size={iconsize} style={iconStyles} />
              </button>
            </div>
          </div>
          <div className="pt-60">
            <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
              <button id="sidebar-Profile" onClick={handleClick}>
                <BsFillPersonBadgeFill size={iconsize} style={iconStyles} />
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
              <button id="sidebar-LogOut" onClick={handleClick}>
                <BsPower size={iconsize} style={iconStyles} />
              </button>
            </div>
          </div>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
