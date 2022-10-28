import { Button } from "@material-tailwind/react";
const SplashScreen = (props) => {
    return (
        <div>
            <Button className="h-12 w-1/3 px-6 m-2 bg-maptile-green shadow-md rounded-lg" ripple={true} onClick={() => props.toggleCreateAccount(true)}>Create Account</Button>
            <Button className="h-12 w-1/3 px-6 m-2 bg-maptile-green shadow-md rounded-lg" ripple={true} onClick={() => props.toggleLogIn(true)}>Log In</Button>
        </div>
    )
}

export default SplashScreen