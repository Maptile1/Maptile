import { Button } from "@material-tailwind/react";
const SplashScreen = (props) => {

    return (
        <div className="grid grid-cols-3 grid-rows-5 place-items-center h-screen w-full circles">
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
            <img className="col-start-2 row-start-2 mt-20 z-10" alt="maptile" src={"maptile-logo.png"}>
            </img>
            <div className="col-start-1 col-span-3 row-start-4 bg-maptile-purple w-3/2 shadow-md rounded-lg z-10">
                <div className="grid grid-cols-6 grid-rows-2 place-items-center w-100%">
                    <div className="col-start-1 col-span-2 text-xl text-white">Join Us Today!</div>
                    <div className="col-start-1 col-span-2 row-start-2">
                        <Button className="h-12 w-60 px-6 m-2 bg-maptile-green shadow-md rounded-lg" ripple={true} onClick={() => props.toggleCreateAccount(true)}>Create Account</Button>
                    </div>
                    <div className="col-start-5 col-span-2 text-xl text-white">Already a User?</div>
                    <div className="col-start-5 col-span-2 row-start-2">
                        <Button className="h-12 w-60 px-6 m-2 bg-maptile-green shadow-md rounded-lg" ripple={true} onClick={() => props.toggleLogIn(true)}>Log In</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SplashScreen