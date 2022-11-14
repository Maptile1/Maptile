import { useNavigate } from "react-router-dom";
import { React, useEffect, useState} from 'react'
const TilesetCard = (props) => {
  const nav = useNavigate();
  const [image, setImage] = useState("https://maptilefiles.blob.core.windows.net/maptile-tileset-image/" + props._id + "?=" + Math.random().toString().substring(2))

  const handleTilesetView = () => {
    nav("/tilesets/" + props._id, { state: { owner: props.owner, _id: props._id } });
  };

  useEffect(() => {
    setImage("https://maptilefiles.blob.core.windows.net/maptile-tileset-image/" + props._id + "?=" + Math.random().toString().substring(2)) 
  }, [props._id])

  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg border bg-maptile-background-mid">
      <img
          class="w-full h-3/4 border border-white cursor-pointer object-cover object-center"
          style={{"image-rendering" : "pixelated"}}
          src={image}
          alt=""
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            setImage(
              "https://maptilefiles.blob.core.windows.net/maptile-tileset-image/6372801adf17e9e9316f1b4c"
            );
          }}
          onClick={()=>handleTilesetView()}
        />
      <div class="px-6 py-4">
        <div class="font-bold text-white text-xl mb-2">{props.name}</div>
        <p class="text-white text-base">{props.description}</p>
      </div>
    </div>
  );
};

export default TilesetCard;
