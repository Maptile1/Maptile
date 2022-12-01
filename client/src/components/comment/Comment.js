import React, { useState, useEffect, useReducer } from "react";
import Axios from "axios";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const Comment = (props) => {

    const [owner, setOwner] = useState(null);
    const [userPfp, setPfp] = useState("");
    const [likedBy, setLikedBy] = useState(props.liked_by);
    const [dislikedBy, setDislikedBy] = useState(props.disliked_by);
    const [likes, setLikes] = useState(props.likes);
    const [dislikes, setDislikes] = useState(props.dislikes)
    const [comments, setComments] = useState(props.comments)
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

    const likeComment = async (comment) => {
        let like_status = comment.usersLiked.includes(props.curr_user._id);
        await Axios.post("https://maptile1.herokuapp.com/comment/like/" + comment._id, {like: !like_status})
        .then((response) => {
            console.log(response.data.comment);
            let index = comments.findIndex(comment => comment._id === response.data.comment._id)
            comments.splice(index, 1, response.data.comment)
            setComments(comments)
            forceUpdate()
          })
          .catch((err) => {
            console.log(err);
          })
    }

    const dislikeComment = async (comment) => {
        let dislike_status = comment.usersDisliked.includes(props.curr_user._id);
        await Axios.post("https://maptile1.herokuapp.com/comment/dislike/" + comment._id, {dislike: !dislike_status})
        .then((response) => {
              console.log(response.data.comment);
              let index = comments.findIndex(comment => comment._id === response.data.comment._id)
              comments.splice(index, 1, response.data.comment)
              setComments(comments)
              forceUpdate()
          })
          .catch((err) => {
            console.log(err);
          })
    }

    useEffect(() => {
         console.log("PROPS:", props)
         setComments(props.comments)

        // const getOwner = async () => {
        //     await Axios.get(
        //         "https://maptile1.herokuapp.com/user/get/" + props.owner
        //       ).then((response) => {
        //         setOwner(response.data.user);
        //         setPfp(
        //           "https://maptilefiles.blob.core.windows.net/maptile-profile-images/" +
        //           response.data.user._id
        //         );
        //       });
        // }
        // getOwner();
    }, [props.comments, reducerValue]);


    return comments ? (comments.filter(n => n).sort(function (a,b) {
      return new Date(a.comment_date) - new Date(b.comment_date)
  }).reverse().map((obj) => {
      console.log("RENDERED COMMENTS")
      let like_color = props.curr_user != null && obj.usersLiked.includes(props.curr_user._id) ? "green" : "gray";
      let dislike_color = props.curr_user != null && obj.usersDisliked.includes(props.curr_user._id) ? "red" : "gray";
      return(
        <div class="relative gap-4 p-4 mt-10 mb-8 border rounded-lg bg-gray-600 text-white shadow-lg">
        <div class="relative flex gap-4">
            <img src={"https://maptilefiles.blob.core.windows.net/maptile-profile-images/" + obj.owner} class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy" />
            <div class="flex flex-col w-full">
                <div class="flex flex-row justify-between">
                    <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">{"JOE"}</p>
                </div>
                <p class="text-sm">{new Date(obj.comment_date).toLocaleDateString() + " " + new Date(obj.comment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div><p class="text-2xl">{obj.likes}</p><FaThumbsUp onClick={() => likeComment(obj)} color={like_color} size={40} stroke={1} /></div>
            <div><p class="text-2xl">{obj.dislikes}</p><FaThumbsDown onClick={() => dislikeComment(obj)} color={dislike_color} size={40} stroke={1} /></div>
        </div>
        <p class="-mt-4">{obj.comment_text}</p>
    </div>
      )
  })) : null
};
export default Comment;