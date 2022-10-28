import { Button } from "@material-tailwind/react";
const SplashScreen = (props) => {

    return (
        <div class="grid grid-cols-3 grid-rows-5 place-items-center h-screen">
            <div class="col-start-2 row-start-2 mt-20 ">
                <img src={"tileset.png"} alt="Logo" />
            </div>
            <div class="col-start-1 col-span-2 row-start-4">
                <Button className="h-12 w-60 px-6 m-2 bg-maptile-green shadow-md rounded-lg" ripple={true} onClick={() => props.toggleCreateAccount(true)}>Create Account</Button>
            </div>
            <div class="col-start-2 col-span-2 row-start-4">
                <Button className="h-12 w-60 px-6 m-2 bg-maptile-green shadow-md rounded-lg" ripple={true} onClick={() => props.toggleLogIn(true)}>Log In</Button>
            </div>
        </div>
    )
}

export default SplashScreen