const TilesetDisplay = (props) => {
    return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" src="tileset.png" alt="Sunset in the mountains" />
            <div class="px-6 py-4">
                <div class="font-bold text-white text-xl mb-2">{props.tilename}</div>
                <p class="text-white text-base">
                    {props.description}
                </p>
            </div>
        </div>
    );
};

export default TilesetDisplay;
