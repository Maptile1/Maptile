import React, { useState, useEffect } from "react";
import Axios from "axios";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const Comment = (props) => {

    const [owner, setOwner] = useState(null);
    const [userPfp, setPfp] = useState("");
    const [loading, setLoading] = useState(true);
    const [likedBy, setLikedBy] = useState(props.liked_by);
    const [dislikedBy, setDislikedBy] = useState(props.disliked_by);
    const [likes, setLikes] = useState(props.likes);
    const [dislikes, setDislikes] = useState(props.dislikes)

    const likeComment = async () => {
        let like_status = likedBy.includes(props.curr_user._id);
        await Axios.post("https://maptile1.herokuapp.com/comment/like/" + props.comment_id, {like: !like_status})
        .then((response) => {
            console.log(response.data.comment);
            setLikedBy(response.data.comment.usersLiked);
            setDislikedBy(response.data.comment.usersDisliked);
            setLikes(response.data.comment.likes)
            setDislikes(response.data.comment.dislikes)
          })
          .catch((err) => {
            console.log(err);
          })
    }

    const dislikeComment = async () => {
        let dislike_status = dislikedBy.includes(props.curr_user._id);
        await Axios.post("https://maptile1.herokuapp.com/comment/dislike/" + props.comment_id, {dislike: !dislike_status})
        .then((response) => {
            console.log(response);
            setLikedBy(response.data.comment.usersLiked);
            setDislikedBy(response.data.comment.usersDisliked);
            setLikes(response.data.comment.likes)
            setDislikes(response.data.comment.dislikes)
          })
          .catch((err) => {
            console.log(err);
          })
    }

    useEffect(() => {
        const getOwner = async () => {
            await Axios.get(
                "https://maptile1.herokuapp.com/user/get/" + props.owner
              ).then((response) => {
                console.log(response.data.user);
                setOwner(response.data.user);
                setPfp(
                  "https://maptilefiles.blob.core.windows.net/maptile-profile-images/" +
                  response.data.user._id
                );
              });
              setLoading(false);
        }
        getOwner();
    }, [likedBy, dislikedBy, likes, dislikes]);

    let like_color = likedBy.includes(props.curr_user._id) ? "green" : "gray";
    let dislike_color = dislikedBy.includes(props.curr_user._id) ? "red" : "gray";

    return !loading && (<div class="relative gap-4 p-4 mt-10 mb-8 border rounded-lg bg-gray-600 text-white shadow-lg">
        <div class="relative flex gap-4">
            <img src={userPfp} class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy" />
            <div class="flex flex-col w-full">
                <div class="flex flex-row justify-between">
                    <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">{owner.userName}</p>
                </div>
                <p class="text-sm">{new Date(props.date).toLocaleDateString() + " " + new Date(props.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div><p class="text-2xl">{likes}</p><FaThumbsUp onClick={likeComment} color={like_color} size={40} stroke={1} /></div>
            <div><p class="text-2xl">{dislikes}</p><FaThumbsDown onClick={dislikeComment} color={dislike_color} size={40} stroke={1} /></div>
        </div>
        <p class="-mt-4">{props.comment_text}</p>
    </div>

    );
};
export default Comment;