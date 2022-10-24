import React, { useState } 	from 'react';
import SplashScreen from '../splash_screen/SplashScreen';
import CreateAccount from '../createAccount/CreateAccount';
import Login from '../login/Login';

const Homescreen = (props) => {
    const [createAccountView, toggleCreateAccountView] = useState(false)
    const [loginView, toggleLogInView] = useState(false)
    const auth = props.user === null ? false : true;
    console.log(createAccountView)
    return(
        <div>
            <h1 className="text-9xl font-sans-extrabold">MAPTILE</h1>
            {props.user === null && auth === false && createAccountView === false && loginView === false ?
                <SplashScreen toggleCreateAccount={toggleCreateAccountView} toggleLogIn={toggleLogInView}/>
            :
                auth === false && createAccountView === true?
                <CreateAccount toggleCreateAccount={toggleCreateAccountView}/>
                :
                auth === false && loginView === true?
                <Login toggleLogIn={toggleLogInView}/>
                :
                <></>
                
            
            }
        </div>
    )
}

export default Homescreen