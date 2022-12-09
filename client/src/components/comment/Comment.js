import React, { useState, useEffect } from "react";
import Axios from "axios";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const Comment = (props) => {

    return props.comments ? (props.comments.filter(n => n).map((comment) => {
      let like_color = props.curr_user != null && comment.usersLiked.includes(props.curr_user._id) ? "green" : "gray";
      let dislike_color = props.curr_user != null && comment.usersDisliked.includes(props.curr_user._id) ? "red" : "gray";
      return(
        <div class="relative gap-4 p-4 mt-10 mb-8 border rounded-lg bg-gray-600 text-white shadow-lg">
        <div class="relative flex gap-4">
            <img src={"https://maptilefiles.blob.core.windows.net/maptile-profile-images/" + comment.owner} class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy" />
            <div class="flex flex-col w-full">
                <div class="flex flex-row justify-between">
                    <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">{comment.name}</p>
                </div>
                <p class="text-sm">{new Date(comment.comment_date).toLocaleDateString() + " " + new Date(comment.comment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div><p class="text-2xl">{comment.likes}</p><FaThumbsUp onClick={() => props.likeComment(comment)} color={like_color} size={40} stroke={1} /></div>
            <div><p class="text-2xl">{comment.dislikes}</p><FaThumbsDown onClick={() => props.dislikeComment(comment)} color={dislike_color} size={40} stroke={1} /></div>
        </div>
        <p class="-mt-4">{comment.comment_text}</p>
    </div>
      )
  })) : null
};
export default Comment;