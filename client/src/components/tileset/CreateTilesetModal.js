import Modal from 'react-modal';
import TilesetPropModal from './TilesetPropModal';
const CreateTilesetModal = (props) => {

  const buttonInvalid = 'transform rounded-sm py-2 font-bold duration-300 bg-maptile-red-unselected hover:bg-maptile-red rounded-xl w-2/3 mt-10 shadow-lg underline'
  const buttonValid = 'transform rounded-sm py-2 font-bold duration-300 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl w-2/3 mt-10 text-white shadow-lg underline'
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
  const readURL = (event) => {
    var file = event.target.files[0]
    getBase64(file).then(base64 => {
      localStorage["imgData"] = base64;
      console.debug("file stored", base64);
    });
    // localStorage.setItem("imgData", imgData);
    // console.log(imgData);
  }



  return (
    <Modal isOpen={props.modalOpen} onRequestClose={props.handleClose} contentLabel="Create Tileset"
      className="createModal bg-maptile-background-mid w-1/3 h-2/3 rounded-xl"
      overlayClassName="modalOverlay">
      <div className="flex flex-col items-center justify-center">
        <button className="text-white w-full text-right text-lg font-bold opacity-50" onClick={props.handleClose}>X</button>
        <div className="text-white text-4xl underline font-bold">Create Tileset</div>
        <div className="text-white mt-8 text-left w-full text-left underline">Tileset Name:</div>
        <input
          type="text"
          name="name"
          placeholder="Tileset Name"
          className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl"
          onBlur={props.updateInput}
        />
        <input type='file' id="upload" placeholder="Upload a Tileset" className="w-full border-none bg-maptile-background-light mt-5 mb-5 outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl" onChange={readURL} />
        <input
          type="text"
          name="name"
          placeholder="Choose Tileset (Optional)"
          className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl"
        />
        <div className="grid grid-cols-5 grid-rows-2 place-items-left w-full">
          <div className="text-white mt-8 text-left row-start-1 underline">Tile Width:</div>
          <input
            type="text"
            name="tilewidth"
            placeholder="Tile Width"
            className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white row-start-2 col-start-1 col-span-2 p-2.5 rounded-xl"
            onBlur={props.updateInput}
          />
          <div className="text-maptile-green row-start-1 text-center text-5xl font-bold row-span-2 mt-14">X</div>
          <div className="text-white mt-8 text-left row-start-1 col-start-4 underline">Tile Height:</div>
          <input
            type="text"
            name="tileheight"
            placeholder="Tile Height"
            className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white row-start-2 col-start-4 col-span-2 p-2.5 rounded-xl"
            onBlur={props.updateInput}
          />
        </div>
        <div className="grid grid-cols-5 grid-rows-2 place-items-left w-full">
          <div className="text-white mt-8 text-left row-start-1 underline">Tileset Width:</div>
          <input
            type="text"
            name="tilesetwidth"
            placeholder="Tileset Width"
            className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white row-start-2 col-start-1 col-span-2 p-2.5 rounded-xl"
            onBlur={props.updateInput}
          />
          <div className="text-maptile-green row-start-1 text-center text-5xl font-bold row-span-2 mt-14">X</div>
          <div className="text-white mt-8 text-left row-start-1 col-start-4 underline">Tileset Height:</div>
          <input
            type="text"
            name="tilesetheight"
            placeholder="Tileset Height"
            className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white row-start-2 col-start-4 col-span-2 p-2.5 rounded-xl"
            onBlur={props.updateInput}
          />
        </div>
        <button onClick={props.handleCreate}
          className={`${!props.inputValid ? buttonInvalid : buttonValid}`}>
          Create Tileset
        </button>
      </div>
    </Modal>
  )
}

export default CreateTilesetModal;