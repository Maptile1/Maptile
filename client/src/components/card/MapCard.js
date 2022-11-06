import { useNavigate } from "react-router-dom";
const TilesetCard = (props) => {
    const nav = useNavigate()
    const handleTilesetView = () => {
        nav("/mapdisplay")
    }
    return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg border border-white bg-maptile-background-mid">
            <img class="w-full h-100 object-cover" src="https://images.gnwcdn.com/2020/usgamer/A-Link-to-the-Past-Map-Header1-05292020.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/the-20-best-in-game-maps.jpg" alt="" onClick={() => handleTilesetView()} />
            <div class="px-6 py-4 ">
                <div class="font-bold text-white text-xl mb-2">{props.mapname}</div>
                <p class="text-white text-base">
                    {props.description}
                </p>
            </div>
        </div>
    );
};

export default TilesetCard;