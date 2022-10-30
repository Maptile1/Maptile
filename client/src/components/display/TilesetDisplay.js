import Sidebar from "../sidebar/Sidebar";
const TilesetDisplay = (props) => {
    return (
        <div>
            <Sidebar />
            <div class="pt-5 text-center text-4xl font-bold text-white">Epic Lava Tileset</div>
            <div class="grid grid-cols-8 grid-flow-row">
                <div class=" col-start-2 mt-10 flex">
                    <img style={{ width: 100, height: 120, borderRadius: 400 / 2 }}
                        class=" object-cover"
                    src="https://www.colorado.edu/today/sites/default/files/styles/medium/public/article-image/liu_s-photo.jpg?itok=l-mJPK65"
                    alt="blog" />
                    <div class="text-white ml-2"> @Joe Schmo</div>
                </div>
            </div>
            <div class="text-xl text-white">HI</div>
        </div>

    );
};

export default TilesetDisplay;
