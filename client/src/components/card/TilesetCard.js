import { useNavigate } from "react-router-dom";
const TilesetCard = (props) => {
    const nav = useNavigate()
    const handleTilesetView = () => {
        nav("/tileset")
    }
    return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" src="tileset.png" alt="Sunset in the mountains" onClick={() => handleTilesetView()} />
            <div class="px-6 py-4">
                <div class="font-bold text-white text-xl mb-2">{props.tilename}</div>
                <p class="text-white text-base">
                    {props.description}
                </p>
            </div>
        </div>
    );
};

export default TilesetCard;