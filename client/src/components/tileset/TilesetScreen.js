import Sidebar from "../sidebar/Sidebar";
import React, { useState } from "react";
import Modal from 'react-modal';

const TilesetScreen = (props) => {
  const [userSelected, updateUserSelected] = useState(true)
  const [modalOpen, setModal] = useState(false)
  const [input, setInput] = useState({ name: '', tilewidth: '', tileheight: '', tilesetwidth: '' ,tilesetheight: ''});
  const [inputValid, setInputValid] = useState(false)
  let tab_selected = 'bg-maptile-background-mid text-center rounded-t-xl cursor-pointer  mt-[10px] duration-300'
  let tab_unselected = 'bg-maptile-tab-unselected text-center rounded-t-xl cursor-pointer duration-300'
  const buttonInvalid = 'transform rounded-sm py-2 font-bold duration-300 bg-maptile-red-unselected hover:bg-maptile-red rounded-xl w-2/3 mt-10 shadow-lg'
  const buttonValid = 'transform rounded-sm py-2 font-bold duration-300 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl w-2/3 mt-10 text-white shadow-lg'

  const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
    setInputValid(updated.name !== '' && updated.tilewidth !== '' && updated.tileheight !== '' && updated.tilesetwidth !== '' && updated.tilesetheight !== '');
	};

  const handleCreate = (e) => {
    if(inputValid){
      setModal(false)
    }
  }

  const handleClose = (e) => {
    setInput({ name: '', tilewidth: '', tileheight: '', tilesetwidth: '' ,tilesetheight: ''})
    setInputValid(false)
    setModal(false)
  }

  return (
    <div>
      <Sidebar/>
      
      <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-top bg-maptile-background-dark text-white">
        <div className="pt-5 text-center text-4xl font-bold text-white underline">Tileset</div>
        <div className="flex flex-col h-[53rem] w-5/6 items-left justify-top ml-20 mt-10">
          <div className="grid grid-cols-8 grid-rows-1 place-items-left w-full">
            <div className={`${userSelected ? tab_selected : tab_unselected}`} onClick={() => updateUserSelected(true)}>User Tilesets</div>
            <div className={`${!userSelected ? tab_selected : tab_unselected}`} onClick={() => updateUserSelected(false)}>Shared Tilesets</div>
            <div className="text-maptile-green col-start-8 text-right text-4xl cursor-pointer" onClick={() => setModal(true)}>+</div>
          </div>
          <div className="bg-maptile-background-mid w-full h-[50rem] rounded-r-xl rounded-b-xl">

          </div>
        </div>
        <Modal isOpen={modalOpen} onRequestClose={handleClose} contentLabel="Create Tileset"
            className="createModal bg-maptile-background-mid w-1/3 h-2/3 rounded-xl"
            overlayClassName="modalOverlay">
          <div className="flex flex-col items-center justify-center">
            <button className="text-white w-full text-right text-lg font-bold opacity-50" onClick={handleClose}>X</button>
            <div className="text-white text-4xl underline font-bold">Create Tileset</div>
            <div className="text-white mt-8 text-left w-full text-left">Tileset Name:</div>
            <input
              type="text"
              name="name"
              placeholder="Tileset Name"
              className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl"
              onBlur={updateInput}
            />
            <div className="text-white mt-8 w-full text-left">Upload a Tileset:</div>
            <input
              type="text"
              name="name"
              placeholder="Choose Tileset (Optional)"
              className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl"
            />
            <div className="grid grid-cols-5 grid-rows-2 place-items-left w-full">
              <div className="text-white mt-8 text-left row-start-1">Tile Width:</div>
              <input
              type="text"
              name="tilewidth"
              placeholder="Tile Width"
              className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white row-start-2 col-start-1 col-span-2 p-2.5 rounded-xl"
              onBlur={updateInput}
              />
              <div className="text-maptile-green row-start-1 text-center text-5xl font-bold row-span-2 mt-14">X</div>
              <div className="text-white mt-8 text-left row-start-1 col-start-4">Tile Height:</div>
              <input
              type="text"
              name="tileheight"
              placeholder="Tile Height"
              className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white row-start-2 col-start-4 col-span-2 p-2.5 rounded-xl"
              onBlur={updateInput}
              />
            </div>
            <div className="grid grid-cols-5 grid-rows-2 place-items-left w-full">
              <div className="text-white mt-8 text-left row-start-1">Tileset Width:</div>
              <input
              type="text"
              name="tilesetwidth"
              placeholder="Tileset Width"
              className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white row-start-2 col-start-1 col-span-2 p-2.5 rounded-xl"
              onBlur={updateInput}
              />
              <div className="text-maptile-green row-start-1 text-center text-5xl font-bold row-span-2 mt-14">X</div>
              <div className="text-white mt-8 text-left row-start-1 col-start-4">Tileset Height:</div>
              <input
              type="text"
              name="tilesetheight"
              placeholder="Tileset Height"
              className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white row-start-2 col-start-4 col-span-2 p-2.5 rounded-xl"
              onBlur={updateInput}
              />
            </div>
            <button onClick={handleCreate}
              className={`${!inputValid ? buttonInvalid: buttonValid}`}>
              Create Tileset
            </button>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default TilesetScreen;
