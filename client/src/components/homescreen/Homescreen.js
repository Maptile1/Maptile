import React, { useState } from "react";
import SplashScreen from "../splash_screen/SplashScreen";
import CreateAccount from "../createAccount/CreateAccount";
import Login from "../login/LogIn";
import Sidebar from "../sidebar/Sidebar";
import Home from "../home/Home";


const Homescreen = (props) => {
  const [createAccountView, toggleCreateAccountView] = useState(false);
  const [loginView, toggleLogInView] = useState(false);
  const [auth, setauth] = useState(false);

  //   const auth = props.user === null ? false : true;

  const handleCreateAccountView = () => {
    toggleCreateAccountView(true);
    toggleLogInView(false);
  }

  const handleLogIn = () => { ///temp usage
    setauth(true);
  }
 
  const handleHomeScreenView = () => {
    toggleCreateAccountView(false);
  }

  return (
    <div>
      {props.user === null &&
        auth === false &&
        createAccountView === false &&
        loginView === false ? (
        <div>
          <SplashScreen
            toggleCreateAccount={toggleCreateAccountView}
            toggleLogIn={toggleLogInView}
          />
        </div>
      ) : auth === false && createAccountView === true ? (
        <CreateAccount toggleCreateAccount={toggleCreateAccountView} handleLogIn={handleLogIn} handleHomeScreenView={handleHomeScreenView} />
      ) : auth === false && loginView === true ? (
        <Login toggleLogIn={toggleLogInView} handleCreateAccountView={handleCreateAccountView} handleLogIn={handleLogIn} />
      ) : (
        <div>
          <Sidebar/>
          <Home/>
        </div>
      )}
    </div>
  );
};

export default Homescreen;
