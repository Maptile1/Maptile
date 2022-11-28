import Modal from "react-modal";
import { useState, useEffect } from "react";
import Axios from "axios";
import Select from "react-select";

const AddTilesetModal = (props) => {
    const [tilesetOptions, setTilesetOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState(null);

    const setHandle = (e) => {
      setSelectedOptions(Array.isArray(e) ? e.map((tileset) => tileset.value) : []);
      console.log("SELECTED OPTIONS:", selectedOptions)
    };

    /**
     * NEED NEW ROUTE FOR ADDING TILESETS
     */
    const submitAddTilesets = async () => {
        console.log("OPTIONS:",selectedOptions);
        await Axios.post("https://maptile1.herokuapp.com/map/update/" + props.map._id, {
          tilesetsToAdd: selectedOptions
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
      const getTilesets = async() => {
        await Axios.post("https://maptile1.herokuapp.com/tileset/getBatch", {
          ids: props.user.tilesets.concat(props.user.shared_tilesets),
          page: 0,
          limit: 9999
        })
        .then(response => {
            console.log("USER TILESETS:", response.data.tilesets)
            let options = [];
            for(let tileset of response.data.tilesets){
              if(props.map.tilesets.includes(tileset._id)){
                continue;
              }
              options.push({
                  value: tileset._id,
                  label: tileset.name
              });
            }
            setTilesetOptions(options)
        })
        .catch(err => {
            console.log(err);
        });
      }
      getTilesets();
    }, []);

  return (
    <Modal
      isOpen={props.modalOpen}
      onRequestClose={() => props.setTilesetModal(false)}
      contentLabel="Share"
      className="createModal bg-maptile-background-mid w-1/3 h-1/2 rounded-xl"
      overlayClassName="modalOverlay"
    >
      <div className="flex flex-col items-left justify-center text-2xl">
        <button
          className="text-white w-full text-right text-lg font-bold opacity-50"
          onClick={() => props.setTilesetModal(false)}
        >
          X
        </button>
        <div className="text-white text-4xl underline font-bold text-center">
          Add Another Tileset
        </div>
        <div class="flex flex-col space-y-5 items-left  ">
          <div className="flex flex-col w-full mt-8">
            {/* <label
              for="share-email"
              class="text-white h-14 p-2.5 rounded-xl underline mt-6"
            >
              Search for a Tileset
            </label> */}
            <div className="flex flex-row w-[580px]">
            <div className="mx-auto container py-8">
            {/* <h1 className="text-sm">Select Tilesets</h1> */}
            <div className="flex flex-wrap items-center lg:justify-between justify-center mt-0 w-full">
              <div className="w-full px-2	">
                <Select placeholder="Select Tileset" options={tilesetOptions} onChange={setHandle} isMulti />
              </div>
            </div>
          </div>
              <button
                onClick={submitAddTilesets}
                className="transform py-2 font-bold duration-300 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl w-1/3 text-white ml-4"
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

export default AddTilesetModal;
