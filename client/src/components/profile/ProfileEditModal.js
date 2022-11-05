import Modal from "react-modal";
import React, { useState } from "react";
import Axios from "axios";

const ProfileEditModal = (props) => {
  var user = props.user;
  const [input, setInput] = useState({
    userName: user.userName,
    email: user.email,
    password: "",
    confirmpassword: "",
  });

  const updateInput = async (e) => {
    const { name, value } = e.target;
    const updated = { ...input, [name]: value };
    setInput(updated);
    const response = await Axios.post(
      "https://maptile1.herokuapp.com/user/update/:id'",
      {
        _id: user._id,
        userName: updated.userName,
        password: updated.password,
      }
    );
  };

  //   const handleLogIn = async (e) => {
  //     console.log(input);
  //       const response = await Axios.post(
  //         "https://maptile1.herokuapp.com/user/login",
  //         {
  //           userName: input.userName,
  //           password: input.password,
  //         }
  //       );
  //       props.handleLogIn(response.data.user);
  //     }
  //   };

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
          <div class="mt-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              class="w-4 h-4 text-green-100 bg-black rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-checkbox"
              class="text-white h-10 p-2.5 rounded-xl"
            >
              Make Public
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label
              for="tags"
              class="text-white h-14 p-2.5 rounded-xl underline"
            >
              Upload A Profile Picture:
            </label>
            <button className="transform rounded-sm py-2 font-bold duration-300 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl w-1/3 text-white mt-3">
              Choose File
            </button>
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
              Change Email
            </label>

            <input
              type="text"
              name="change-email"
              placeholder="(Current Email)"
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
              name="change-username"
              placeholder="Enter a Password"
              className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl"
            />
          </div>

          <div className="flex flex-col w-full">
            <label
              for="share-email"
              class="text-white h-14 p-2.5 rounded-xl underline"
            >
              Confirm Password
            </label>

            <input
              type="password"
              name="confirm-password"
              placeholder="Confirm Password"
              className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileEditModal;
