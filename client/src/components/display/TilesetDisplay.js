import Sidebar from "../sidebar/Sidebar";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { BsSave } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { MdOutlineContentCopy } from "react-icons/md";
import { Fragment, useEffect, useState } from "react";
import Comment from "../comment/Comment";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Axios from "axios";

Axios.defaults.withCredentials = true;

const TilesetDisplay = (props) => {
  const nav = useNavigate();
  const { id } = useParams();
  var [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tileset, setTileset] = useState(null);
  const [userPfp, setPfp] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleOtherUserProfile = () => {
    nav("/user/" + location.state.owner, {
      state: { owner: location.state.owner },
    });
  };
  const location = useLocation();

  const addToShared = () => {};

  const handleCommentChange = (event) => {
      setComment(event.target.value);
  }

  const handleAddComment = async () => {
      await Axios.post("https://maptile1.herokuapp.com/comment/create", 
      {
        comment_text: comment,
        post: id
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    console.log("TILESET ID: ", id);
    const getOwner = async () => {
      setLoading(true);
      console.log("USER ID: ", location.state.owner);
      await Axios.get(
        "https://maptile1.herokuapp.com/user/get/" + location.state.owner
      ).then((response) => {
        console.log(response.data.user);
        setOwner(response.data.user);
        setPfp(
          "https://maptilefiles.blob.core.windows.net/maptile-profile-images/" +
            response.data.user._id
        );
      });
      await Axios.get("https://maptile1.herokuapp.com/tileset/get/" + id).then(
        (response) => {
          console.log("TILESET:", response.data.tileset);
          setTileset(response.data.tileset);
        }
      ); 
      await Axios.get("https://maptile1.herokuapp.com/comment/" + id).then(
        (response) => {
            console.log("COMMENTS:", response.data.comments)
            setComments(response.data.comments)
        }
      ); 
      setLoading(false);
    };
    getOwner();
  }, [location.state._id, location.state.owner, id]);

  return (
    <div>
      {!loading && (
        <div>
          <Sidebar />
          <div class="container px-6 text-xl py-10 mx-auto text-white">
            <div class="text-center text-4xl font-bold">{tileset.name}</div>
            <div class="grid grid-cols-5 grid-rows-2">
              <div class="row-start-1 col-start-1 col-span-3 mt-10">
                <div class="flex">
                  <img
                    style={{ width: 100, height: 120, borderRadius: 400 / 2 }}
                    class="w-full h-3/4 object-cover object-center border-2 border-maptile-green"
                    src={userPfp}
                    alt="blog"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src =
                        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";
                    }}
                    onClick={() => handleOtherUserProfile()}
                  />

                  <div class="flex flex-col justify-between ml-5">
                    <div>{owner.userName}</div>
                    <div>{tileset.description}</div>
                  </div>
                </div>
              </div>
              <div class="row-start-1 col-start-7 justify-end mt-5">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-opacity-20 px-4 py-2 text-5xl font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      ...
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <BiEdit
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <BiEdit
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                              Edit
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => addToShared()}
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <MdOutlineContentCopy
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <MdOutlineContentCopy
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                              Save to Shared
                            </button>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <BsSave
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <BsSave
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                              Download
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div class="mt-10 row-start-2 col-span-3">
                Tags: {tileset.tags.join(", ")}
              </div>
              <div class="row-start-3 row-end-4 col-start-1 col-end-4 mb-10">
                <img
                  class="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl"
                  src={
                    "https://maptilefiles.blob.core.windows.net/maptile-tileset-image/" +
                    tileset._id
                  }
                  alt=""
                  style={{ "image-rendering": "pixelated" }}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src =
                      "https://maptilefiles.blob.core.windows.net/maptile-tileset-image/6372801adf17e9e9316f1b4c";
                  }}
                />
              </div>
              <div class="flex flex-row gap-20 row-start-3 col-start-5">
                <div class="flex flex-col text-6xl font-bold">
                  {" "}
                  <FaThumbsUp color={"green"} size={100} stroke={1} />
                  <div class="mt-10">{tileset.likes} Likes</div>
                </div>

                <div class="flex flex-col text-6xl font-bold">
                  <FaThumbsDown color={"red"} size={100} />
                  <div class="mt-10 ">{tileset.dislikes} Dislikes</div>
                </div>
              </div>

              <div class="row-start-4 mt-5 col-span-5 ">
                Comments
                {
                  comments.map((obj, index)=>
                    <Comment
                      owner={obj.owner}
                      date={obj.comment_date}
                      comment_text={obj.comment_text}
                    /> 
                    ) 
                }
              </div>

              <div class="row-start-5 col-start-1 col-span-5 shadow-lg mt-2 w-full">
                <div class="w-full max-w-xl  bg-gray-600 border rounded-lg px-4 pt-2 flex text-white">
                  <div class="flex flex-wrap -mx-3 mb-6">
                    <h2 class="px-4 pt-3 pb-2  text-lg">Add A Comment</h2>
                    <div class="w-full  px-3 mb-2 mt-2">
                      <textarea
                        onChange={handleCommentChange}
                        class="bg-gray-700 rounded border border-white leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-white focus:outline-none focus:bg-gray-600"
                        name="body"
                        placeholder="Type Your Comment"
                        required
                        id="commenttext"
                      ></textarea>
                    </div>
                    <div class="w-full flex items-start  px-3">
                      <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto"></div>
                      <div class="-mr-1">
                        <input
                          type="submit"
                          onClick={() => handleAddComment()}
                          class="bg-grayfont-medium py-1 px-4 border border-white bg-gray-700 rounded-lg tracking-wide mr-1 hover:bg-gray-600"
                          value="Post Comment"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TilesetDisplay;
