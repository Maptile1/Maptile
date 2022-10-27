import React, { useState } from "react";
import SplashScreen from "../splash_screen/SplashScreen";
import CreateAccount from "../createAccount/CreateAccount";
import Login from "../login/LogIn";
import Sidebar from "../sidebar/Sidebar";
import Home from "../home/Home";
import TilesetScreen from "../tileset/TilesetScreen";
import MapScreen from "../map/MapScreen";
import ProfileScreen from "../profile/ProfileScreen";
import SearchScreen from "../search/SearchScreen";

const Homescreen = (props) => {
  const [createAccountView, toggleCreateAccountView] = useState(false);
  const [loginView, toggleLogInView] = useState(false);
  const [homeView, toggleHomeView] = useState(false);
  const [tilesetView, toggleTilesetView] = useState(false);
  const [mapView, toggleMapView] = useState(false);
  const [profileView, toggleProfileView] = useState(false);
  const [searchView, toggleSearchView] = useState(false);

  console.log(homeView);
  //   const auth = props.user === null ? false : true;
  const auth = "";

  const handleHomeView = () => {
    toggleHomeView(true);
    toggleTilesetView(false);
    toggleMapView(false);
    toggleProfileView(false);
    toggleSearchView(false);
  };

  const handleTilesetView = () => {
    toggleHomeView(false);
    toggleTilesetView(true);
    toggleMapView(false);
    toggleProfileView(false);
    toggleSearchView(false);
  };

  const handleMapView = () => {
    toggleHomeView(false);
    toggleTilesetView(false);
    toggleMapView(true);
    toggleProfileView(false);
    toggleSearchView(false);
  };

  const handleProfileView = () => {
    toggleHomeView(false);
    toggleTilesetView(false);
    toggleMapView(false);
    toggleProfileView(true);
    toggleSearchView(false);
  };

  const handleSearchView = () => {
    toggleHomeView(false);
    toggleTilesetView(false);
    toggleMapView(false);
    toggleProfileView(false);
    toggleSearchView(true);
  };
  return (
    <div>
      {props.user === null &&
      auth === false &&
      createAccountView === false &&
      loginView === false ? (
        <div>
          <h1 className="text-9xl font-sans-extrabold">MAPTILE</h1>
          <SplashScreen
            toggleCreateAccount={toggleCreateAccountView}
            toggleLogIn={toggleLogInView}
          />
        </div>
      ) : auth === false && createAccountView === true ? (
        <CreateAccount toggleCreateAccount={toggleCreateAccountView} />
      ) : auth === false && loginView === true ? (
        <Login toggleLogIn={toggleLogInView} />
      ) : (
        <div>
          <Sidebar
            handleHomeView={handleHomeView}
            handleTilesetView={handleTilesetView}
            handleMapView={handleMapView}
            handleProfileView={handleProfileView}
            handleSearchView={handleSearchView}
          />
          {homeView && <Home />}
          {tilesetView && <TilesetScreen />}
          {mapView && <MapScreen />}
          {profileView && <ProfileScreen />}
          {searchView && <SearchScreen />}
        </div>
      )}
    </div>
  );
};

export default Homescreen;
