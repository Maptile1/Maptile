import { Menu, Transition } from "@headlessui/react";
// import { BiShareAlt } from "react-icons/bi"
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Fragment } from "react";
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
        <div class="w-40 rounded overflow-hidden mt-5 mx-14">
            <img
                onClick={() => handleTilesetDisplay()}
                class="w-full h-3/4 border border-white cursor-pointer object-cover object-center"
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
                class=" truncate hover:text-clip text-wrap text-center text-white text-xl underline mt-5 pb-10 cursor-pointer"
            >
                {props.name}
            </div>

        </div>
    )
};

export default SearchCard;
