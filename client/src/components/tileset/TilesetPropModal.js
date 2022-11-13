import Modal from 'react-modal';
import React, { useState, useRef } from 'react';
import Axios from "axios";
const TilesetPropModal = (props) => {
    var tileset = props.tileset
    const [input, setInput] = useState({
        name: tileset.name,
        description: tileset.description,
    });
    const updateInput = (e) => {
        const { name, value } = e.target;
        const updated = { ...input, [name]: value };
        setInput(updated);
    };
    const [tags, setTags] = useState([])
    const tagRef = useRef(null)

    const addTag = () => {
        const tag = tagRef.current.value
        if (tag !== "") {
            setTags([...tags, tag])
        }
    }

    const removeTag = (e) => {
        const tag = e.target.getAttribute("name")
        setTags(tags.filter((t) => t !== tag))
    }

    const handleRename = async (e) => {
        console.log(input)
        let response = await Axios.post(
            "https://maptile1.herokuapp.com/tileset/update/" + tileset._id,
            {
                tileset_data: tileset.tileset_data[0].data,
                name: input.name,
                description: input.description,
                public: tileset.public

            }
        )
        console.log(response);
        props.updateTileset(response.data.tileset);
        props.setTilesetPropModal(false);

    }
    return (
        <Modal isOpen={props.tilesetPropModalOpen} onRequestClose={() => props.setTilesetPropModal(false)} contentLabel="Rename"
            className="createModal bg-maptile-background-mid w-1/3 h-2/7 rounded-xl"
            overlayClassName="modalOverlay">
            <div className="flex flex-col items-left justify-center text-2xl">
                <button className="text-white w-full text-right text-lg font-bold opacity-50" onClick={() => props.setTilesetPropModal(false)}>X</button>
                <div className="text-white text-4xl underline font-bold text-center">Tileset Properties</div>
                <div className="flex flex-col w-full">
                    <div className="flex flex-col w-full mt-5">
                        <label for="name" class="text-white h-14 p-2.5 rounded-xl underline">Name</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={tileset.name}
                            onChange={updateInput}
                            className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl mt-3"
                        />
                    </div>
                    <div className="flex flex-col w-full mt-5">
                        <label for="description" class="text-white h-14 p-2.5 rounded-xl underline">Description</label>
                        <input
                            type="description"
                            name="description"
                            defaultValue={tileset.description}
                            onChange={updateInput}
                            className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl"
                        />
                    </div>
                    <div className="flex flex-col w-full mt-5">
                        <label for="tags" class="text-white h-14 p-2.5 rounded-xl underline">Add a tag:</label>
                        <input
                            ref={tagRef}
                            type="text"
                            name="tags"
                            placeholder="Enter a tag"
                            className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl"
                        />
                        <button className="transform  rounded-sm py-2 font-bold duration-300 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl w-1/3 text-white mt-5" onClick={addTag}>Add Tag</button>
                    </div>

                    <div class="flex flex-col text-white">
                        <div class="underline text-xl h-10 rounded-xl mt-5">Tags</div>
                        <div className="list-disc text-lg">
                            {tags.map((obj, index) => <li className="cursor-pointer" onClick={removeTag} name={obj}>{obj}</li>)}

                        </div>
                    </div>
                    <button className="transform rounded-sm py-2 font-bold duration-300 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl w-full text-white mt-5" onClick={() => handleRename()}>
                        Confirm
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default TilesetPropModal;