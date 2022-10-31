import Modal from 'react-modal';
import { BsClipboard } from "react-icons/bs"

const ShareModal = (props) => {
    const tags = ["fire", "water"]
    return (
        <Modal isOpen={props.modalOpen} onRequestClose={() => props.setShareModal(false)} contentLabel="Share"
            className="createModal bg-maptile-background-mid w-1/3 h-2/3 rounded-xl"
            overlayClassName="modalOverlay">
            <div className="flex flex-col items-center justify-center text-2xl">
                <button className="text-white w-full text-right text-lg font-bold opacity-50" onClick={() => props.setShareModal(false)}>X</button>
                <div className="text-white text-4xl underline font-bold">Share Options</div>
                <div class="flex flex-col space-y-16 items-center justify-center ">
                    <div class="mt-4">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-green-100 bg-black rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="default-checkbox" class="text-white h-14 p-2.5 rounded-xl">Make Public</label>
                    </div>
                    <div>
                        <label for="email" class="text-white h-14 p-2.5 rounded-xl">Edit Access</label>
                        <input id="email" type="text" placeholder="Send email"></input>

                    </div>

                    <input type="text" placeholder="Tags.."></input>
                    <div class="flex flex-col items-center justify-center text-white text-sm">
                        <div class="underline text-xl">Tags</div>
                        {tags.map((obj, index) => <div>{obj}</div>)}
                    </div>
                    <div>
                        <BsClipboard />
                        <label>Copy Link</label>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ShareModal;