import Modal from 'react-modal';
import React from 'react';
// import { useState, useRef } from 'react';

import { BsClipboard } from "react-icons/bs"

const ShareModal = (props) => {
    return (
        <Modal isOpen={props.modalOpen} onRequestClose={() => props.setShareModal(false)} contentLabel="Share"
            className="createModal bg-maptile-background-mid w-1/3 h-2/7 rounded-xl"
            overlayClassName="modalOverlay">
            <div className="flex flex-col items-left justify-center text-2xl">
                <button className="text-white w-full text-right text-lg font-bold opacity-50" onClick={() => props.setShareModal(false)}>X</button>
                <div className="text-white text-4xl underline font-bold text-center">Share Options</div>
                <div class="flex flex-col space-y-5 items-left  ">
                    <div class="mt-4">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-green-100 bg-black rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="default-checkbox" class="text-white h-10 p-2.5 rounded-xl">Make Public</label>
                    </div>
                    <div className="flex flex-col w-full">
                        <label for="share-email" class="text-white h-14 p-2.5 rounded-xl underline">Invite Someone to Edit:</label>

                        <input
                            type="text"
                            name="share-email"
                            placeholder="User Email"
                            className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl"
                        />

                    </div>
                    <div className="text-white">
                        <BsClipboard className="cursor-pointer " />
                        <label className="cursor-pointer">Copy Link</label>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ShareModal;