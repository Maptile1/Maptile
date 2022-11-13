import Modal from "react-modal";
import React, { useState } from "react";
import Axios from "axios";

const ProfileEditModal = (props) => {
    var user = props.user;
    const [input, setInput] = useState({
        userName: user.userName,
        email: user.email,
        bio: user.bio,
        password: "",
        confirmpassword: "",
    });

    const updateInput = (e) => {
        const { name, value } = e.target;
        const updated = { ...input, [name]: value };
        setInput(updated);
    };

    const handleUpdate = async (e) => {

        if (input.password !== "" || input.confirmpassword !== "") {
            if (input.password === input.confirmpassword) {
                await Axios.post(
                    "https://maptile1.herokuapp.com/user/update",
                    {
                        userName: input.userName,
                        bio: input.bio,
                        email: input.email,
                        password: input.password,
                    }
                )
                    .then(function (response) {

                        props.updateUser(response.data.user)
                    })
                    .catch(function (error) {
                        window.alert(error.response.data.errorMessage)
                    })

                return
            }

            window.alert("Passwords do not match.")
            return
        }
        else {

            await Axios.post(
                "https://maptile1.herokuapp.com/user/update",
                {
                    userName: input.userName,
                    bio: input.bio,
                    email: input.email,
                }
            )
                .then(function (response) {
                    props.updateUser(response.data.user)
                })
                .catch(function (error) {
                    window.alert(error.response.data.errorMessage)
                })
        }
        props.setProfileModal(false)
    }

    const uploadPfp = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('_id', user._id)

        await Axios.post("https://maptile1.herokuapp.com/user/image", formData)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
        props.updatePfp("https://maptilefiles.blob.core.windows.net/maptile-profile-images/" + user._id)
        console.log("updated")
    }

    return (
        <Modal
            isOpen={props.modalOpen}
            onRequestClose={() => props.setProfileModal(false)}
            contentLabel="Profile"
            className="createModal bg-maptile-background-mid w-1/3 h-3/4 rounded-xl"
            overlayClassName="modalOverlay"
        >
            <div className="flex flex-col items-left justify-center text-2xl">
                <button
                    className="text-white w-full text-right text-lg font-bold opacity-50"
                    onClick={() => props.setProfileModal(false)}
                >
                    X
                </button>
                <div className="text-white text-4xl underline font-bold text-center">
                    Profile Options
                </div>
                <div class="flex flex-col space-y-5 items-left  ">
                    <div className="flex flex-col w-full">
                        <label
                            for="tags"
                            class="text-white h-14 p-2.5 rounded-xl underline"
                        >
                            Upload A Profile Picture:
                        </label>
                        <input type="file" name="image" accept="image/*" multiple={false} onChange={uploadPfp} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label
                            for="share-email"
                            class="text-white h-14 p-2.5 rounded-xl underline"
                        >
                            Change User Name
                        </label>

                        <input
                            type="text"
                            name="userName"
                            defaultValue={user.userName}
                            onChange={updateInput}
                            className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label
                            for="share-email"
                            class="text-white h-14 p-2.5 rounded-xl underline"
                        >
                            Update Bio
                        </label>

                        <input
                            type="text"
                            name="bio"
                            defaultValue={user.bio}
                            onChange={updateInput}
                            className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label
                            for="share-email"
                            class="text-white h-14 p-2.5 rounded-xl underline"
                        >
                            Change Email
                        </label>

                        <input
                            type="text"
                            name="email"
                            defaultValue={user.email}
                            onChange={updateInput}
                            className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label
                            for="share-email"
                            class="text-white h-14 p-2.5 rounded-xl underline"
                        >
                            Change Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter a Password"
                            onChange={updateInput}
                            className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl"
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label
                            for="confirm-password"
                            class="text-white h-14 p-2.5 rounded-xl underline"
                        >
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            onChange={updateInput}
                            className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl"
                        />
                    </div>
                    <button className="transform rounded-sm py-2 font-bold duration-300 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl w-full text-white mt-3" onClick={() => handleUpdate()}>
                        Confirm
                    </button>
                </div>
            </div>
        </Modal >
    );
};

export default ProfileEditModal;
