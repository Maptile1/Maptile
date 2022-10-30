import Sidebar from "../sidebar/Sidebar";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa"
import Comment from "../comment/Comment";
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
                    <div class="flex flex-row gap-20 row-start-3 col-start-5">
                        <div class="flex flex-col text-6xl font-bold"> <FaThumbsUp color={"green"} size={100} stroke={1} /><div class="mt-10">5 Likes</div></div>

                        <div class="flex flex-col text-6xl font-bold">< FaThumbsDown color={"red"} size={100} /><div class="mt-10 ">5 Dislikes</div></div>
                    </div>


                    <div class="row-start-4 mt-5 col-span-5 ">
                        Comments
                        <Comment owner={"Joe Schmo"} date={"October 30 2021 at 8:00pm"} comment_text={"This tileset is great for my new game!"} />
                        <Comment owner={"Joe Schmo"} date={"October 30 2021 at 8:00pm"} comment_text={"This tileset is great for my new game!"} />

                    </div>

                    <div class=" row-start-5 col-start-1 col-span-5 shadow-lg mt-2 w-full">
                        <form class="w-full max-w-xl  bg-gray-600 border rounded-lg px-4 pt-2 flex text-white">
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <h2 class="px-4 pt-3 pb-2  text-lg">Add A Comment</h2>
                                <div class="w-full  px-3 mb-2 mt-2">
                                    <textarea class="bg-gray-700 rounded border border-white leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-white focus:outline-none focus:bg-gray-600" name="body" placeholder='Type Your Comment' required></textarea>
                                </div>
                                <div class="w-full flex items-start  px-3">
                                    <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                                    </div>
                                    <div class="-mr-1">
                                        <input type='submit' class="bg-grayfont-medium py-1 px-4 border border-white bg-gray-700 rounded-lg tracking-wide mr-1 hover:bg-gray-600" value='Post Comment' />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </div >

    );
};

export default TilesetDisplay;
