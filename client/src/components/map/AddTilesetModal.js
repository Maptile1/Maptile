import Modal from "react-modal";

const AddTilesetModal = (props) => {
  
  return (
    <Modal
      isOpen={props.modalOpen}
      onRequestClose={() => props.setTilesetModal(false)}
      contentLabel="Share"
      className="createModal bg-maptile-background-mid w-1/3 h-2/7 rounded-xl"
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
          <div className="flex flex-col w-full">
            <label
              for="share-email"
              class="text-white h-14 p-2.5 rounded-xl underline"
            >
              Search for a Tileset
            </label>
            <div className="flex flex-row w-[580px]">
              <input
                type="text"
                id="tileset-input"
                name="tileset-input"
                placeholder="Find a Tileset:"
                className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl"
              />
              <button
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
