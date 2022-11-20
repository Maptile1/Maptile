import React, { useState, useEffect } from "react";
import Axios from "axios";

const Comment = (props) => {

    const [owner, setOwner] = useState(null);
    const [userPfp, setPfp] = useState("");

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
        }
        getOwner();
    }, []);

    return (<div class="relative gap-4 p-4 mt-10 mb-8 border rounded-lg bg-gray-600 text-white shadow-lg">
        <div class="relative flex gap-4">
            <img src={userPfp} class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy" />
            <div class="flex flex-col w-full">
                <div class="flex flex-row justify-between">
                    <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">{owner.userName}</p>

                </div>
                <p class="text-sm">{props.date}</p>
            </div>
        </div>
        <p class="-mt-4">{props.comment_text}</p>
    </div>

    );
};
export default Comment;