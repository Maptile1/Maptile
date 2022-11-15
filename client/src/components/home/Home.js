import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const Home = (props) => {
  const nav = useNavigate()

  const handleClick = (e) => {
    const { id } = e.currentTarget
    if (id === "home-Tileset") {
      nav("/user_tilesets")
    }
    if (id === "home-Map") {
      nav("/user_maps")
    }
    if (id === "home-Search") {
      nav("/search")
    }
    if (id === "home-Profile") {
      nav("/user_profile")
    }
    if (id === "toptileset") {
      nav("/tilesetdisplay")
    }
    if (id === "topmap") {
      nav("/mapdisplay")
    }
  }

  return <div>
    <div className="circles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <Sidebar setTheUser={props.setTheUser} />
      <div class="container px-6 py-10 mx-auto z-10">
      
        <h1 class="text-3xl font-semibold text-white capitalize lg:text-4xl dark:text-white">On Maptile</h1>

        <div class="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 z-20">
          <div class="lg:flex z-30">
            <img class="object-cover w-full h-56 rounded-lg lg:w-64 z-40" src="https://cdn.dribbble.com/users/1514670/screenshots/17817496/media/260fa9c895a14133f8821e173b130c14.jpg?compress=1&resize=400x300" alt="" />

            <div class="flex flex-col justify-between py-6 lg:mx-6">
              <button id="home-Tileset" class="text-xl font-semibold text-white hover:underline dark:text-white " onClick={handleClick}>
                Create your Tilesets
              </button>
            </div>
          </div>

          <div class="lg:flex z-30">
            <img class="object-cover w-full h-56 rounded-lg lg:w-64" src="https://cdn.dribbble.com/users/1068771/screenshots/6339347/map4_4x.jpg?compress=1&resize=400x300" alt="" />

            <div class="flex flex-col justify-between py-6 lg:mx-6">
              <button id="home-Map" class="text-xl font-semibold text-white hover:underline dark:text-white " onClick={handleClick}>
                Create your Maps
              </button>
            </div>
          </div>

          <div class="lg:flex z-30">
            <img class="object-cover w-full h-56 rounded-lg lg:w-64" src="https://content.presentermedia.com/files/clipart/00001000/1813/searching_stick_figure_800_wht.jpg" alt="" />

            <div class="flex flex-col justify-between py-6 lg:mx-6">
              <button id="home-Search" class="text-xl font-semibold text-white hover:underline dark:text-white " onClick={handleClick}>
                Search Tilesets/Maps
              </button>

            </div>
          </div>

          <div class="lg:flex z-30">
            <img class="object-cover w-full h-56 rounded-lg lg:w-64" src="https://cdn3.iconfinder.com/data/icons/my-business-icons/200/BusinessIcon-03-512.png" alt="" />

            <div class="flex flex-col justify-between py-6 lg:mx-6">
              <button id="home-Profile" class="text-xl font-semibold text-white hover:underline dark:text-white " onClick={handleClick}>
                Profile Page
              </button>
            </div>
          </div>

          <div class="lg:flex z-30">
            <img class="object-cover w-full h-56 rounded-lg lg:w-64" id="toptileset" src="https://dicegrimorium.com/wp-content/uploads/2019/09/LavaPoolsPublic1JPG-1024x683.jpg" alt="" onClick={handleClick} />

            <div class="flex flex-col justify-between py-6 lg:mx-6">
              <div class="text-xl font-semibold text-white hover:underline dark:text-white ">
                Today's Top Tileset
              </div>
              <span class="text-lg text-white">The Lava Tileset</span>
              <span class="text-sm text-white">Looking to make your next Lava Map?</span>
            </div>
          </div>

          <div class="lg:flex z-30">
            <img class="object-cover w-full h-56 rounded-lg lg:w-64" id="topmap" src="https://images.gnwcdn.com/2020/usgamer/A-Link-to-the-Past-Map-Header1-05292020.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/the-20-best-in-game-maps.jpg" onClick={handleClick} alt="" />

            <div class="flex flex-col justify-between py-6 lg:mx-6">
              <div class="text-xl font-semibold text-white hover:underline dark:text-white ">
                Today's Top Map
              </div>
              <span class="text-lg text-white">The GREATEST MAP</span>
              <span class="text-sm text-white">This map is perfect for large and pocket games</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
};

export default Home;
