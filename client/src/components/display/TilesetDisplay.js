import Sidebar from "../sidebar/Sidebar";
import { BsFillHandThumbsUpFill, BsFillHandThumbsDownFill } from "react-icons/bs"
const TilesetDisplay = (props) => {
    return (
        <div>
            <Sidebar />
            <div class="container px-6 text-xl py-10 mx-auto text-white">
                <div class="text-center text-4xl font-bold">Epic Lava Tileset</div>
                <div class="grid grid-cols-5 grid-rows-2">
                    <div class="row-start-1 col-start-1 col-span-3 mt-10">
                        <div class="flex">
                            <img style={{ width: 100, height: 120, borderRadius: 400 / 2 }}
                                class=" object-cover"
                                src="https://www.colorado.edu/today/sites/default/files/styles/medium/public/article-image/liu_s-photo.jpg?itok=l-mJPK65"
                                alt="blog" />

                            <div class="flex flex-col justify-between ml-5">
                                <div>@Joe Schmo</div>
                                <div>Destiny Inspired Map</div>
                            </div>

                        </div>
                    </div>
                    <div class="mt-10 row-start-2 col-span-3">Tags: Destiny, Space, Adventure, Gray</div>
                    <div class="row-start-3 row-end-4 col-start-1 col-end-4 bg-white">
                        <img class="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl" src="https://pbs.twimg.com/media/EWTELxfXYAMD66j.jpg:large" alt="" />
                    </div>
                    <div class="flex flex-row gap-10 row-start-3 col-start-5">
                        <BsFillHandThumbsUpFill color={"green"} size={100} /> <div>5</div>
                        < BsFillHandThumbsDownFill color={"red"} size={100} /> <div>5</div>
                    </div>

                    <div class="row-start-4 mt-5">
                        <div>Comments</div>

                    </div>

                </div>

            </div>
        </div >

    );
};

export default TilesetDisplay;
