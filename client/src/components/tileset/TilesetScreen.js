import Sidebar from "../sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import CreateTilesetModal from "./CreateTilesetModal";
import TSSCard from "../card/TSSCard";
import ShareModal from "../map/ShareModal";
import Axios from "axios";

Axios.defaults.withCredentials = true

const TilesetScreen = (props) => {
  const [userSelected, updateUserSelected] = useState(true);
  const [modalOpen, setModal] = useState(false);
  var [userTilesets, setUserTilesets] = useState([]);
  var [sharedTilesets, setSharedTilesets] = useState([])
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

  var user = props.user;

  useEffect(() => {
    const getTilesets = async () => {
      var response = await Axios.get(
        "https://maptile1.herokuapp.com/tileset/getUser/" + user._id
      );
      setUserTilesets(response.data.usertilesets);
      setSharedTilesets(response.data.sharedtilesets)
    };
    getTilesets();
    if (localStorage.getItem('imgData') !== null) {
      localStorage.removeItem('imgData')
    }
  }, [user]);

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
  const handleDelete = async (id) => {
    let response = await Axios.post(
      "https://maptile1.herokuapp.com/tileset/delete/" + id
    );
    console.log(response);
    const getTilesets = async () => {
      var response = await Axios.get(
        "https://maptile1.herokuapp.com/tileset/getUser/" + user._id
      );
      setUserTilesets(response.data.usertilesets);
    };
    getTilesets();
  };

  const handleDeleteShare = async (id) => {
    await Axios.post(
      "https://maptile1.herokuapp.com/tileset/deleteshared/" + user._id, {
      tilesetid: id
    }
    ).then((response) => {
      console.log(response.data.sharedtilesets);
    })
    const getTilesets = async () => {
      var response = await Axios.get(
        "https://maptile1.herokuapp.com/tileset/getUser/" + user._id
      );
      setUserTilesets(response.data.usertilesets);
      setSharedTilesets(response.data.sharedtilesets)
    };
    getTilesets();
  }

  const handleCreate = async (e) => {
    if (inputValid) {
      await Axios.post("https://maptile1.herokuapp.com/tileset/create", {
        tile_width: input.tilewidth,
        tile_height: input.tileheight,
        tileset_width: input.tilesetwidth,
        tileset_height: input.tilesetheight,
        name: input.name,
      });
      const getTilesets = async () => {
        var response = await Axios.get(
          "https://maptile1.herokuapp.com/tileset/getUser/" + user._id
        );
        setUserTilesets(response.data.usertilesets);
      };
      getTilesets();
      setModal(false);
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

  return (
    <div>
      <Sidebar setTheUser={props.setTheUser} />

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
            <div className="flex flex-row flex-wrap px-5 py-5 pl-10 gap-y-5  ">
              {userSelected ?
                userTilesets.length !== 0 ?

                  userTilesets.map((obj, index) => (
                    <TSSCard
                      handleDelete={handleDelete}
                      name={obj.name}
                      owner={obj.owner}
                      _id={obj._id}
                    />
                  )) : <div>No Tilesets</div>
                :
                sharedTilesets.length !== 0 ?

                  sharedTilesets.map((obj, index) => (
                    <TSSCard
                      handleDelete={handleDelete}
                      shared={true}
                      name={obj.name}
                      owner={obj.owner}
                      handleDeleteShare={handleDeleteShare}
                      _id={obj._id}
                    />
                  )) : <div>No Shared Tilesets</div>
              }
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
