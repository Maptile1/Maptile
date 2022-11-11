import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homescreen from "./components/homescreen/Homescreen";
import Home from "./components/home/Home";
import TilesetScreen from "./components/tileset/TilesetScreen";
import MapScreen from "./components/map/MapScreen";
import SearchScreen from "./components/search/SearchScreen";
import ProfileScreen from "./components/profile/ProfileScreen";
import TilesetDisplay from "./components/display/TilesetDisplay";
import MapDisplay from "./components/display/MapDisplay";
import EditTileset from "./components/tileset/EditTileset";
import EditMap from "./components/map/EditMap";
import OtherUserProfile from "./components/profile/OtherUserProfile";

function App() {
  const [user, setUser] = useState(null);
  const [otherProfileUser, setOtherProfileUser] = useState(null);

  const setTheUser = (newuser) => {
    setUser(newuser);
  };

  const setOtherProfile = (owner) => {
    ///this will be used to view other user's profile
    setOtherProfileUser(owner);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route
            exact
            index
            path="/"
            element={<Homescreen user={user} setTheUser={setTheUser} />}
          />
          <Route
            path="/home"
            element={<Home user={user} setTheUser={setTheUser} />}
          />
          <Route
            path="/user_tilesets"
            element={<TilesetScreen user={user} setTheUser={setTheUser} />}
          />
          <Route
            path="/user_maps"
            element={<MapScreen user={user} setTheUser={setTheUser} />}
          />
          <Route
            path="/search"
            element={<SearchScreen user={user} setTheUser={setTheUser} />}
          />
          <Route
            path="/user_profile"
            element={<ProfileScreen user={user} setTheUser={setTheUser} />}
          />
          <Route
            path="/other_user_profile"
            element={
              <OtherUserProfile user={user} setTheUser={setTheUser}
              />
            }
          />
          <Route
            path="/tilesetdisplay"
            element={
              <TilesetDisplay
                user={user}
                setTheUser={setTheUser}
                setOtherProfile={setOtherProfile}
              />
            }
          />
          <Route
            path="/mapdisplay"
            element={
              <MapDisplay
                user={user}
                setTheUser={setTheUser}
                setOtherProfile={setOtherProfile}
              />
            }
          />
          <Route
            path="/tileset_edit"
            element={<EditTileset user={user} setTheUser={setTheUser} />}
          />
          <Route
            path="/map_edit"
            element={<EditMap user={user} setTheUser={setTheUser} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
