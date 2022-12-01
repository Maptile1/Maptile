import React, { useState, useEffect, useReducer } from "react";
import Axios from "axios";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const Comment = (props) => {
    const [comments, setComments] = useState(null)

    useEffect(() => {
        const getCommentOwners = async () => {
          let namedComments = []
          for(let comment of props.comments){
            await Axios.get(
              "https://maptile1.herokuapp.com/user/get/" + comment.owner
            ).then((response) => {
                namedComments.push({
                  name: response.data.user.userName,
                  comment: comment
                })
            });
          }
          setComments(namedComments)
        }
        getCommentOwners();
    }, [props.comments]);


    return comments ? (comments.filter(n => n).sort(function (a,b) {
      return new Date(a.comment_date) - new Date(b.comment_date)
  }).reverse().map((obj) => {
      let like_color = props.curr_user != null && obj.comment.usersLiked.includes(props.curr_user._id) ? "green" : "gray";
      let dislike_color = props.curr_user != null && obj.comment.usersDisliked.includes(props.curr_user._id) ? "red" : "gray";
      return(
        <div class="relative gap-4 p-4 mt-10 mb-8 border rounded-lg bg-gray-600 text-white shadow-lg">
        <div class="relative flex gap-4">
            <img src={"https://maptilefiles.blob.core.windows.net/maptile-profile-images/" + obj.comment.owner} class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy" />
            <div class="flex flex-col w-full">
                <div class="flex flex-row justify-between">
                    <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">{obj.name}</p>
                </div>
                <p class="text-sm">{new Date(obj.comment.comment_date).toLocaleDateString() + " " + new Date(obj.comment.comment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div><p class="text-2xl">{obj.comment.likes}</p><FaThumbsUp onClick={() => props.likeComment(obj.comment)} color={like_color} size={40} stroke={1} /></div>
            <div><p class="text-2xl">{obj.comment.dislikes}</p><FaThumbsDown onClick={() => props.dislikeComment(obj.comment)} color={dislike_color} size={40} stroke={1} /></div>
        </div>
        <p class="-mt-4">{obj.comment.comment_text}</p>
    </div>
      )
  })) : null
};
export default Comment;