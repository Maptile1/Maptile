import Sidebar from "../sidebar/Sidebar";
import React, { useState } from "react";
import CreateMapModal from "./CreateMapModal";
import MSCard from "../card/MSCard"
import ShareModal from "./ShareModal";
const MapScreen = (props) => {
  const [userSelected, updateUserSelected] = useState(true)
  const [modalOpen, setModal] = useState(false)
  const [shareModalOpen, setShareModal] = useState(false)
  const [input, setInput] = useState({ name: '', tilewidth: '', tileheight: '', mapwidth: '', mapheight: '', tileset: '' });
  const [inputValid, setInputValid] = useState(false)
  let tab_selected = 'bg-maptile-background-mid text-center rounded-t-xl cursor-pointer  mt-[10px] duration-300'
  let tab_unselected = 'bg-maptile-tab-unselected text-center rounded-t-xl cursor-pointer duration-300'


  const updateInput = (e) => {
    const { name, value } = e.target;
    const updated = { ...input, [name]: value };
    setInput(updated);
    setInputValid(updated.name !== '' && updated.tilewidth !== '' && updated.tileheight !== '' && updated.mapwidth !== '' && updated.mapheight !== '' && updated.tileset !== '');
  };

  const handleCreate = (e) => {
    if (inputValid) {
      setModal(false)
    }
  }

  const handleShare = (e) => {
    setShareModal(false);
  }

  const handleShareClose = () => {
    setShareModal(false);
  }
  const handleClose = (e) => {
    setInput({ name: '', tilewidth: '', tileheight: '', mapwidth: '', mapheight: '', tileset: '' })
    setInputValid(false)
    setModal(false)
  }

  const maps = []
  let map1 = { name: "Great Map" };
  let map2 = { name: "Best Map" };
  let map3 = { name: "Nice Map" }
  let map4 = { name: "Water Map" }
  let map5 = { name: "Grass Map" }
  let map6 = { name: "Lava Map" }
  let map7 = { name: "Small Map" }
  let map8 = { name: "Large Map" }

  maps.push(map1, map2, map3, map4, map5, map6, map7, map8)
  return (
    <div>
      <Sidebar />

      <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-top bg-maptile-background-dark text-white">
        <div className="pt-5 text-center text-4xl font-bold text-white underline">Maps</div>
        <div className="flex flex-col h-[53rem] w-5/6 items-left justify-top ml-20 mt-10">
          <div className="grid grid-cols-8 grid-rows-1 place-items-left w-full">
            <div className={`${userSelected ? tab_selected : tab_unselected}`} onClick={() => updateUserSelected(true)}>User Maps</div>
            <div className={`${!userSelected ? tab_selected : tab_unselected}`} onClick={() => updateUserSelected(false)}>Shared Maps</div>
            <div className="text-maptile-green col-start-8 text-right text-4xl cursor-pointer" onClick={() => setModal(true)}>+</div>
          </div>
          <div className="bg-maptile-background-mid w-full h-[50rem] rounded-r-xl rounded-b-xl overflow-auto">
            <div className="flex flex-row flex-wrap px-5 py-5 pl-10  ">
              {maps.map((obj, index) =>
                <MSCard name={obj.name} setShareModal={setShareModal} />
              )}
            </div>
            <CreateMapModal modalOpen={modalOpen} inputValid={inputValid} updateInput={updateInput} handleCreate={handleCreate} handleClose={handleClose} />
            <ShareModal modalOpen={shareModalOpen} handleShare={handleShare} handleShareClose={handleShareClose} setShareModal={setShareModal} />
          </div>
        </div>

      </main>
    </div>
  );
};

export default MapScreen;
