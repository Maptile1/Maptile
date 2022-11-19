
import { useNavigate } from "react-router-dom";
import { React, useState, useEffect } from 'react';

const SearchCard = (props) => {
    const nav = useNavigate();
    const [image, setImage] = useState("https://maptilefiles.blob.core.windows.net/maptile-tileset-image/" + props._id + "?=" + Math.random().toString().substring(2))
    const handleTilesetDisplay = () => {
        console.log("TILESET ID: ", props._id)
        nav("/tilesets/" + props._id, { state: { owner: props.owner, _id: props._id } });
    };

    useEffect(() => {
        setImage("https://maptilefiles.blob.core.windows.net/maptile-tileset-image/" + props._id + "?=" + Math.random().toString().substring(2))
    }, [props._id])

    return (
        <div class="w-1/4 h-1/4 rounded shadow-2xl bg-maptile-background-dark overflow-hidden mx-6">
            <img
                onClick={() => handleTilesetDisplay()}
                class="w-3/4 h-3/4 ml-10 mt-10 border shadow-2xl border-white cursor-pointer object-cover object-center"
                style={{ "image-rendering": "pixelated" }}
                src={image}
                alt=""
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    setImage(
                        "https://maptilefiles.blob.core.windows.net/maptile-tileset-image/6372801adf17e9e9316f1b4c"
                    );
                }}
            />


            <div
                onClick={() => handleTilesetDisplay()}
                class=" truncate hover:text-clip text-wrap text-center text-white text-xl mt-5 pb-5 underline cursor-pointer"
            >
                {props.name}
            </div>

        </div>
    )
};

export default SearchCard;
