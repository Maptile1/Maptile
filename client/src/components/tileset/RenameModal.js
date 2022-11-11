import Modal from 'react-modal';
import React, { useState, useRef } from 'react';
import Axios from "axios";
const RenameModal = (props) => {
    var tileset = props.tileset
    const [name, setName] = useState(tileset.name);
    const updateInput = (e) => {
        const updated = e.target.value;
        setName(updated);
    }

    const handleRename = async (e) => {
        let response = await Axios.post(
            "https://maptile1.herokuapp.com/tileset/update/" + tileset._id,
            {
                tileset_data: tileset.tileset_data,
                name: name,
                description: tileset.description,
                public: tileset.public

            }
        )
        props.updateName(response.data.tileset.name)
        props.setRenameModal(false);

    }
    return (
        <Modal isOpen={props.renameModalOpen} onRequestClose={() => props.setRenameModal(false)} contentLabel="Rename"
            className="createModal bg-maptile-background-mid w-1/3 h-2/7 rounded-xl"
            overlayClassName="modalOverlay">
            <div className="flex flex-col items-left justify-center text-2xl">
                <button className="text-white w-full text-right text-lg font-bold opacity-50" onClick={() => props.setRenameModal(false)}>X</button>
                <div className="text-white text-4xl underline font-bold text-center">Rename</div>
                <div className="flex flex-col w-full">

                    <input

                        type="text"
                        name="userName"
                        defaultValue={tileset.name}
                        onChange={updateInput}
                        className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl mt-5"
                    />
                    <button className="transform rounded-sm py-2 font-bold duration-300 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl w-full text-white mt-4" onClick={() => handleRename()}>
                        Confirm
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default RenameModal;