import Sidebar from "../sidebar/Sidebar";
const TilesetDisplay = (props) => {
    return (
        <div>
            <Sidebar />
            <div class="pt-5 text-center text-4xl font-bold text-white">                    Epic Lava Tileset</div>
            <div class="grid grid-cols-10">

                {/* <img
                    class="w-20 h-20 object-cover object-center"
                    src="https://www.colorado.edu/today/sites/default/files/styles/medium/public/article-image/liu_s-photo.jpg?itok=l-mJPK65"
                    alt="blog"
                /> */}
            </div>
            {/* <div class="col-start-2 ml-28 row-start-3 text-white text-1xl ">  @Joe Schmo</div> */}
        </div>

    );
};

export default TilesetDisplay;
