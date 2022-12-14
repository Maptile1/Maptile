import { useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";

const SearchCard = (props) => {
  const nav = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleDisplay = () => {
    console.log("TILESET ID: ", props._id);
    if (props.type === "tileset") {
      nav("/tilesets/" + props._id, {
        state: { owner: props.owner, _id: props._id },
      });
    } else {
      nav("/maps/" + props._id, {
        state: { owner: props.owner, _id: props._id },
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    if (props.type == "tileset") {
      setImage(
        "https://maptilefiles.blob.core.windows.net/maptile-tileset-image/" +
          props._id +
          "?=" +
          Math.random().toString().substring(2)
      );
      setLoading(false);
    } else {
      setImage(
        "https://maptilefiles.blob.core.windows.net/maptile-map-image/" +
          props._id +
          "?=" +
          Math.random().toString().substring(2)
      );
      setLoading(false);
    }
  }, [props._id]);

  return (
    <div class="w-1/4 h-1/4 rounded shadow-2xl bg-maptile-background-dark overflow-hidden">
      {!loading && (
        <img
          onClick={() => handleDisplay()}
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
      )}

      <div
        onClick={() => handleDisplay()}
        class=" truncate hover:text-clip text-wrap text-center text-white text-xl mt-5 pb-5 underline cursor-pointer"
      >
        {props.name}
      </div>
    </div>
  );
};

export default SearchCard;
