import Modal from "react-modal";
import { useState, useRef } from 'react';

const RenameLayerModal = (props) => {
    const [layerText, setLayerText] = useState("")
    const textRef = useRef(null)

    const updateText = (e) => {
        setLayerText(e.target.value)
    }

    const renameConfirm = () => {
        props.renameLayer(textRef.current.value, props.id)
        props.setRenameLayerModal(false)
    }

    return (
        <Modal
        isOpen={props.modalOpen}
        onRequestClose={() => props.setRenameLayerModal(false)}
        contentLabel="Share"
        className="createModal bg-maptile-background-mid w-1/3 h-2/7 rounded-xl"
        overlayClassName="modalOverlay"
        >
        <div className="flex flex-col items-left justify-center text-2xl">
            <button
            className="text-white w-full text-right text-lg font-bold opacity-50"
            onClick={() => props.setRenameLayerModal(false)}
            >
            X
            </button>
            <div className="text-white text-4xl underline font-bold text-center">
            {"Rename Layer: " + props.name}
            </div>
            <div class="flex flex-col space-y-5 items-left  ">
            <div className="flex flex-col w-full">
                <label
                for="share-email"
                class="text-white h-14 p-2.5 rounded-xl underline"
                >
                Name
                </label>
                <div className="flex flex-row w-[580px]">
                <input
                    type="text"
                    id="name-input"
                    name="name-input"
                    ref={textRef}
                    placeholder={props.name}
                    onChange={updateText}
                    className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl"
                />
                <button
                    className="transform py-2 font-bold duration-300 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl w-1/3 text-white ml-4"
                    onClick={()=>renameConfirm()}
                >
                    Rename
                </button>
                </div>
            </div>
            </div>
        </div>
    </Modal>
  );
};

export default RenameLayerModal;
