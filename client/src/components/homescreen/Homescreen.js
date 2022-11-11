import React, { useState } from "react";
import SplashScreen from "../splash_screen/SplashScreen";
import CreateAccount from "../createAccount/CreateAccount";
import Login from "../login/LogIn";
import { useNavigate } from "react-router-dom";


const Homescreen = (props) => {
  const [createAccountView, toggleCreateAccountView] = useState(false);
  const [loginView, toggleLogInView] = useState(false);
  // const [auth, setauth] = useState(false)
  const nav = useNavigate()

  const handleCreateAccountView = () => {
    toggleCreateAccountView(true);
    toggleLogInView(false);
  }

  const handleLogIn = (user) => { ///temp usage
    // setauth(true);
    // props.setUser(user);
    console.log("User has logged in");
    props.setTheUser(user);
    nav("/home", { replace: true })
  }

  const handleHomeScreenView = () => {
    toggleCreateAccountView(false);
    toggleLogInView(false);
  }
  return (
    <div>
      {props.user === null &&
        createAccountView === false &&
        loginView === false ? (
        <div>
          <SplashScreen
            toggleCreateAccount={toggleCreateAccountView}
            toggleLogIn={toggleLogInView}
          />
        </div>
      ) : createAccountView === true ? (
        <CreateAccount toggleCreateAccount={toggleCreateAccountView} handleLogIn={handleLogIn} handleHomeScreenView={handleHomeScreenView} />
      ) : loginView === true ? (
        <Login toggleLogIn={toggleLogInView} handleCreateAccountView={handleCreateAccountView} handleLogIn={handleLogIn} handleHomeScreenView={handleHomeScreenView} />
      ) : (
        <div>
          {/* <Sidebar setUser={props.setUser} />
          <Home /> */}
        </div>
      )}
    </div>
  );
};

export default Homescreen;
