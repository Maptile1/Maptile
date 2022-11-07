import { useNavigate } from "react-router-dom";
const TilesetCard = (props) => {
    const nav = useNavigate()
    const handleTilesetView = () => {
        nav("/tilesetdisplay", { state: { owner: props.owner } })
    }
    return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg pb-20 border bg-maptile-background-mid">
            <img class="w-full h-50 object-cover" src="https://dicegrimorium.com/wp-content/uploads/2019/09/LavaPoolsPublic1JPG-1024x683.jpg" alt="" onClick={() => handleTilesetView()} />
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