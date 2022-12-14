import Sidebar from "../sidebar/Sidebar";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { BsSave } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { MdOutlineContentCopy } from "react-icons/md";
import { Fragment, useEffect, useState, useRef, useReducer } from "react";
import Comment from "../comment/Comment";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Axios from "axios";
import { saveAs } from "file-saver";
import { FaUserAlt, FaHeart } from "react-icons/fa";

Axios.defaults.withCredentials = true;

const TilesetDisplay = (props) => {
  const nav = useNavigate();
  const { id } = useParams();
  var [owner, setOwner] = useState(null);
  const [tileset, setTileset] = useState(null);
  const [userPfp, setPfp] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState();
  const [dislikes, setDislikes] = useState();
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const commentRef = useRef(null);

  const handleOtherUserProfile = () => {
    nav("/user/" + owner._id, {
      state: { owner: owner },
    });
  };
  const location = useLocation();

  const handleDownload = () => {
    saveAs(
      "https://maptilefiles.blob.core.windows.net/maptile-tileset-image/" +
        tileset._id,
      tileset.name + ".png"
    );
  };
  const addThenEdit = async () => {
    await Axios.post(
      "https://maptile1.herokuapp.com/tileset/addshared/" + props.user._id,
      {
        tilesetid: id,
      }
    )
      .then((response) => {
        console.log(response.data.sharedtilesets);
      })
      .catch((err) => {
        console.log(err);
      });
    nav("/tileset_edit", { state: { _id: id } });
  };

  const addToShared = async () => {
    console.log(props.user_id, id);
    await Axios.post(
      "https://maptile1.herokuapp.com/tileset/addshared/" + props.user._id,
      {
        tilesetid: id,
      }
    )
      .then((response) => {
        console.log(response.data);
        alert("Added");
      })
      .catch((err) => {
        if (err.response.data.errorMessage === "Tileset already shared") {
          alert("You already added this tileset");
        }
        if (err.response.data.errorMessage === "Own Tileset") {
          alert("This is your own tileset");
        }
        console.log(err.response.data);
      });
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = async () => {
    await Axios.post("https://maptile1.herokuapp.com/comment/create", {
      comment_text: comment,
      post: id,
    })
      .then((response) => {
        console.log("RESPONSE:", response.data.payload.comment);
        var comment = response.data.payload.comment;
        comment.name = props.user.userName;
        setComments([comment, ...comments]);
      })
      .catch((err) => {
        console.log(err);
      });
    commentRef.current.value = "";
  };

  const likeComment = async (comment) => {
    let like_status = comment.usersLiked.includes(props.user._id);
    Axios.post(
      "https://maptile1.herokuapp.com/comment/like/" + comment._id,
      { like: !like_status }
    )
      .then((response) => {
        console.log(response.data.comment);
        var newComments = comments.map((comment) => {
          if (comment._id == response.data.comment._id){
            response.data.comment.name = comment.name;
            return response.data.comment;
          }
          else{
            return comment;
          }
        })
        setComments(newComments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dislikeComment = async (comment) => {
    let dislike_status = comment.usersDisliked.includes(props.user._id);
    Axios.post(
      "https://maptile1.herokuapp.com/comment/dislike/" + comment._id,
      { dislike: !dislike_status }
    )
      .then((response) => {
        console.log(response.data.comment);
        var newComments = comments.map((comment) => {
          if (comment._id == response.data.comment._id){
            response.data.comment.name = comment.name;
            return response.data.comment;
          }
          else{
            return comment;
          }
        })
        setComments(newComments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLikesAndDislikes = async () => {
    await Axios.get("https://maptile1.herokuapp.com/tileset/get/" + id).then(
      (response) => {
        setTileset(response.data.tileset);
        setLikes(response.data.tileset.likes);
        setDislikes(response.data.tileset.dislikes);
      }
    );
  };

  const likeTileset = async () => {
    let like_status = tileset.usersLiked.includes(props.user._id);
    await Axios.post(
      "https://maptile1.herokuapp.com/tileset/like/" + tileset._id,
      { like: !like_status }
    )
      .then((response) => {
        console.log(response);
        setLikes(response.data.tileset.likes);
        setDislikes(response.data.tileset.dislikes);
      })
      .catch((err) => {
        console.log(err);
      });
    getLikesAndDislikes();
  };

  const dislikeTileset = async () => {
    let dislike_status = tileset.usersDisliked.includes(props.user._id);
    await Axios.post(
      "https://maptile1.herokuapp.com/tileset/dislike/" + tileset._id,
      { dislike: !dislike_status }
    )
      .then((response) => {
        console.log(response);
        setLikes(response.data.tileset.likes);
        setDislikes(response.data.tileset.dislikes);
      })
      .catch((err) => {
        console.log(err);
      });
    getLikesAndDislikes();
  };

  useEffect(() => {
    console.log("USE EFFECT");
    // console.log("TILESET ID: ", id);
    // console.log("USER ID: ", location.state.owner);
    if(props.user == null){
      Axios.get(
        "https://maptile1.herokuapp.com/user/loggedin"
      )
      .then((response) => {
        console.log("LOGGED IN USER:", response.data)
        if (response.data.user !== undefined){
          props.setTheUser(response.data.user)
        }
        else{
          nav("/", { replace: true })
        }
      })
      .catch((err) => {
        console.log(err)
      });
    }
    Axios.get("https://maptile1.herokuapp.com/tileset/get/" + id).then(
      (response) => {
        // console.log("TILESET:", response.data.tileset);
        setTileset(response.data.tileset);
        setLikes(response.data.tileset.likes);
        setDislikes(response.data.tileset.dislikes);
        Axios.get(
          "https://maptile1.herokuapp.com/user/get/" + response.data.tileset.owner
        ).then((response) => {
          console.log(response.data.user);
          setOwner(response.data.user);
          setPfp(
            "https://maptilefiles.blob.core.windows.net/maptile-profile-images/" +
              response.data.user._id
          );
      });
      }
    );
    Axios.get("https://maptile1.herokuapp.com/comment/" + id).then(
      (response) => {
        // console.log("COMMENTS:", response.data.comments)
        var ids = response.data.comments.map((comment) => {return comment.owner});
        Axios.post("https://maptile1.herokuapp.com/user/getNames", { ids: ids })
        .then((res) => {
          var map = res.data.names;
          var newComments = response.data.comments.map((comment) => {
            comment.name = map[comment.owner];
            return comment;
          })
          console.log(newComments);
          setComments(newComments);
        });
      }
    );
  }, [props.user, id, reducerValue]);

  let like_color = "gray";
  let dislike_color = "gray";
  if (tileset !== null && props.user != null) {
    like_color = tileset.usersLiked.includes(props.user._id) ? "green" : "gray";
    dislike_color = tileset.usersDisliked.includes(props.user._id)
      ? "red"
      : "gray";
  }
  return (
    <div>
      {owner && tileset && comments ? (
        <div>
          <Sidebar setTheUser={props.setTheUser} />
          <div class="container px-6 text-xl py-10 mx-auto text-white">
            <div class="text-center text-4xl font-bold">{tileset.name}</div>
            <div class="grid grid-cols-5 grid-rows-2 ">
              <div class="row-start-1 col-start-1 col-span-1 mt-10 bg-gradient-to-br from-maptile-green/60 to-maptile-green-alt/60 rounded-3xl p-2">
                <div class="flex">
                  <img
                    style={{ width: 100, height: 120, borderRadius: 400 / 2 }}
                    class="w-full h-3/4 object-cover object-center border-2 border-maptile-green ml-3"
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
                    <div className="text-white text-lg flex flex-row">
                      <div className="mt-2">{owner.userName}</div>
                      <FaUserAlt className="mt-3 ml-2" />
                    </div>
                    <div className="mb-2 text-lg">{tileset.description}</div>
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
                        {/* <Menu.Item>
                          {({ active }) => (
                            <button onClick={() => addThenEdit()}
                              className={`${active
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
                              className={`${active
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
                        </Menu.Item> */}

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleDownload()}
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
              <div class="mt-10 row-start-2 col-span-1">
                <div
                  className={`w-full bg-maptile-background-mid rounded-xl p-2`}
                >
                  Tags: {tileset.tags.join(", ")}
                </div>
              </div>
              <div class="row-start-3 row-end-4 col-start-1 col-end-4 mb-10 bg-gradient-to-br from-maptile-green/60 to-maptile-green-alt/60 rounded-[50px]">
                <img
                  class="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl"
                  src={
                    "https://maptilefiles.blob.core.windows.net/maptile-tileset-image/" +
                    tileset._id +
                    "?=" +
                    Math.random().toString().substring(2)
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
              <div class="flex flex-row row-start-3 col-start-5 gap-20 h-2/5 bg-maptile-background-mid rounded-l-3xl">
                <div class="flex flex-col text-6xl font-bold p-2">
                  {" "}
                  <FaThumbsUp
                    color={like_color}
                    onClick={likeTileset}
                    size={100}
                    stroke={1}
                  />
                  <div class="mt-10">{likes} Likes</div>
                </div>

                <div class="flex flex-col text-6xl font-bold bg-maptile-background-mid rounded-r-3xl p-2">
                  <FaThumbsDown
                    onClick={dislikeTileset}
                    color={dislike_color}
                    size={100}
                  />
                  <div class="mt-10 ">{dislikes} Dislikes</div>
                </div>
              </div>

              <div class="row-start-4 mt-5 col-span-5 ">
                Comments
                {
                  <Comment
                    comments={comments}
                    curr_user={props.user}
                    likeComment={likeComment}
                    dislikeComment={dislikeComment}
                  />
                }
              </div>

              <div class="row-start-5 col-start-1 col-span-5 shadow-lg mt-2 w-full">
                <div class="w-full max-w-xl  bg-gray-600 border rounded-lg px-4 pt-2 flex text-white">
                  <div class="flex flex-wrap -mx-3 mb-6">
                    <h2 class="px-4 pt-3 pb-2  text-lg">Add A Comment</h2>
                    <div class="w-full  px-3 mb-2 mt-2">
                      <textarea
                        ref={commentRef}
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
                          onClick={handleAddComment}
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
      ) : null}
    </div>
  );
};

export default TilesetDisplay;
