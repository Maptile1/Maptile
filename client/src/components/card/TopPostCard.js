import { React, useState, useEffect } from "react";
import { FaUserAlt, FaHeart } from "react-icons/fa";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
const TopPostCard = (props) => {
    const [owner, setOwner] = useState(null);
    const [loading, setLoading] = useState(true);
    var nav = useNavigate();
    useEffect(() => {
        const getOwner = async () => {

            await Axios.get(
                "https://maptile1.herokuapp.com/user/get/" + props.owner
            ).then((response) => {
                setLoading(true);
                setOwner(response.data.user);
                setLoading(false);
            })

        };
        getOwner();
    }, []);
    const navProfile = () => {
        nav("/user/" + props.owner, {
            state: { owner: props.owner },
        });
    }
    const handleTilesetDisplay = () => {
        nav("/tilesets/" + props._id, { state: { owner: props.owner, _id: props._id } });
    };

    const [image, setImage] = useState("https://maptilefiles.blob.core.windows.net/maptile-tileset-image/" +
        props._id)
    return (
        <div className={`bg-gradient-to-br from-maptile-green/60 to-maptile-green-alt/60 bg-opacity-10 w-2/5 h-full rounded-full z-30 overflow-hidden relative`}>
            <div className="flex flex-row w-full h-full overflow-hidden relative left-20">
                <div className="grid w-1/3 h-full place-items-center justify-center">
                    <img
                        class="w-[192px] h-[180px] border border-white cursor-pointer object-cover object-center rounded-[50px] left-[50px]"
                        style={{ "image-rendering": "pixelated" }}
                        src={image}
                        alt=""
                        onClick={() => handleTilesetDisplay()}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            setImage(
                                "https://maptilefiles.blob.core.windows.net/maptile-tileset-image/6372801adf17e9e9316f1b4c"
                            );
                        }}
                    />
                </div>
                <div className="flex flex-col w-2/3 text-white font-bold underline mt-5 left-10 relative">
                    <div className="flex flex-row ">
                        <div onClick={() => handleTilesetDisplay()} className="text-2xl p-2">{props.name}</div>
                    </div>
                    <div className="flex flex-row ">
                        {!loading &&
                            <div className="text-2xl p-2 cursor-pointer" onClick={() => navProfile()}>{owner.userName}</div>
                        }
                        <FaUserAlt className=" text-3xl ml-3 mt-3 cursor-pointer " />
                    </div>
                    <div className="flex flex-row ">
                        <div className="text-2xl p-2">{props.likes}</div>
                        <FaHeart className=" text-3xl ml-3 mt-3 cursor-pointer text-red-400" />
                    </div>



                </div>
            </div>
        </div>);
};

export default TopPostCard;
