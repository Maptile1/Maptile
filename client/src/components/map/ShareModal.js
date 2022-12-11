import Modal from "react-modal";
import React, { useState } from "react";
// import { useState, useRef } from 'react';

import { BsClipboard } from "react-icons/bs";

const ShareModal = (props) => {
  const [email, setEmail] = useState("");
  const handleShare = () => {
    props.handleShare(email);
    document.getElementById("email").value = "";
  };

  const updateInput = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Modal
      isOpen={props.modalOpen}
      onRequestClose={() => props.setShareModal(false)}
      contentLabel="Share"
      className="createModal bg-maptile-background-mid w-1/3 h-2/7 rounded-xl"
      overlayClassName="modalOverlay"
    >
      <div className="flex flex-col items-left justify-center text-2xl">
        <button
          className="text-white w-full text-right text-lg font-bold opacity-50"
          onClick={() => props.setShareModal(false)}
        >
          X
        </button>
        <div className="text-white text-4xl underline font-bold text-center">
          Share Options
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
              for="share-email"
              class="text-white h-14 p-2.5 rounded-xl underline"
            >
              Invite Someone to Edit:
            </label>
            <div className="flex flex-row w-[580px]">
              <input
                type="text"
                id="email"
                onChange={updateInput}
                name="share-email"
                placeholder="User Email"
                className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl"
              />
              <button
                onClick={() => handleShare()}
                className="transform  rounded-sm py-2 font-bold duration-300 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl w-1/3 text-white ml-4"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
