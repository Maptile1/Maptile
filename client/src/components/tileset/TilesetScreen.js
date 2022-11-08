import Sidebar from "../sidebar/Sidebar";
import React, { useState } from "react";
import CreateTilesetModal from "./CreateTilesetModal";
import TSSCard from "../card/TSSCard";
import ShareModal from "../map/ShareModal";
import Axios from "axios";
const TilesetScreen = (props) => {
  const [userSelected, updateUserSelected] = useState(true);
  const [modalOpen, setModal] = useState(false);
  const [input, setInput] = useState({
    name: "",
    tilewidth: "",
    tileheight: "",
    tilesetwidth: "",
    tilesetheight: "",
  });
  const [inputValid, setInputValid] = useState(false);
  const [shareModalOpen, setShareModal] = useState(false);
  let tab_selected =
    "bg-maptile-background-mid text-center rounded-t-xl cursor-pointer  mt-[10px] duration-300";
  let tab_unselected =
    "bg-maptile-tab-unselected text-center rounded-t-xl cursor-pointer duration-300";
  const user = props.user;
  console.log(user);

  const updateInput = (e) => {
    const { name, value } = e.target;
    const updated = { ...input, [name]: value };
    setInput(updated);
    setInputValid(
      updated.name !== "" &&
        updated.tilewidth !== "" &&
        updated.tileheight !== "" &&
        updated.tilesetwidth !== "" &&
        updated.tilesetheight !== ""
    );
  };

  const handleCreate = async (e) => {
    if (inputValid) {
      setModal(false);
      await Axios.post("https://maptile1.herokuapp.com/tileset/create", {
        name: input.name,
        _id: props.user._id,
      });
    }
  };

  const handleClose = (e) => {
    setInput({
      name: "",
      tilewidth: "",
      tileheight: "",
      tilesetwidth: "",
      tilesetheight: "",
    });
    setInputValid(false);
    setModal(false);
  };

  const tilesets = [];
  let tileset1 = { name: "Great Tileset" };
  let tileset2 = { name: "Best Tileset" };
  let tileset3 = { name: "Nice Tileset" };
  let tileset4 = { name: "Water Tileset" };
  let tileset5 = { name: "Grass Tileset" };
  let tileset6 = { name: "Lava Tileset" };
  let tileset7 = { name: "Small Tileset" };
  let tileset8 = { name: "Large Tileset" };

  tilesets.push(
    tileset1,
    tileset2,
    tileset3,
    tileset4,
    tileset5,
    tileset6,
    tileset7,
    tileset8
  );
  return (
    <div>
      <Sidebar />

      <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-top bg-maptile-background-dark text-white">
        <div className="pt-5 text-center text-4xl font-bold text-white">
          Tileset
        </div>
        <div className="flex flex-col h-[53rem] w-5/6 items-left justify-top ml-20 mt-10">
          <div className="grid grid-cols-8 grid-rows-1 place-items-left w-full">
            <div
              className={`${userSelected ? tab_selected : tab_unselected}`}
              onClick={() => updateUserSelected(true)}
            >
              User Tilesets
            </div>
            <div
              className={`${!userSelected ? tab_selected : tab_unselected}`}
              onClick={() => updateUserSelected(false)}
            >
              Shared Tilesets
            </div>
            <div
              className="text-maptile-green col-start-8 text-right text-4xl cursor-pointer"
              onClick={() => setModal(true)}
            >
              +
            </div>
          </div>
          <div className="bg-maptile-background-mid w-full h-[50rem] rounded-r-xl rounded-b-xl overflow-auto">
            <div className="flex flex-row flex-wrap px-5 py-5 pl-10  ">
              {tilesets.map((obj, index) => (
                <TSSCard name={obj.name} />
              ))}
            </div>
            <CreateTilesetModal
              modalOpen={modalOpen}
              inputValid={inputValid}
              updateInput={updateInput}
              handleCreate={handleCreate}
              handleClose={handleClose}
            />
            <ShareModal
              modalOpen={shareModalOpen}
              setShareModal={setShareModal}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TilesetScreen;
