import Sidebar from "../sidebar/Sidebar";
import EditMapMenu from "./EditMapMenu";
import ShareModal from "./ShareModal";
import { React, useState, useEffect } from "react";
import EditMapTileDisplay from "./EditMapTileDisplay";
import EditMapGridCell from "./EditMapGridCell";
import LayerCard from "../card/LayerCard";
import MapPropModal from "./MapPropModal";
import Axios from "axios";
import { useLocation } from "react-router-dom";

const EditMap = (props) => {
  const [shareModalOpen, setShareModal] = useState(false);
  // const [gridRow, setGridRow] = useState(64)
  // const [gridCol, setGridCol] = useState(64)
  const [loading, setLoading] = useState(false);
  const [mapPropModal, setMapPropModal] = useState(false);
  const [map, setMap] = useState(null);
  const [gridSize, setGridSize] = useState({ x: 20, y: 20 });
  // ! Layer Formating
  // * Name: Name of the Layer
  // ? Name todo: Implement Name Change Function
  // * Data: 1D array of integers, these represent the tile id
  // ! Data Important : ID's are shifted by 1 as 0 is a blank space, so the true ID: 0 on the tileset is actually 1
  // * Active: Flag Determining if the layer is to be rendered, NYI
  // * Custom Prop: Object that contains a type, ex. : boolean, int , and a value for that prop type
  // ! Custom Prop: This is for use in a game engine so it must be formatted like the data Tiled (that other app for making tilesets) produces 
  const [layers, setLayers] = useState([{name:"1",data:[], active:true, customProp:{type: "", value:""}, id:0}])
  const [layerCount, setLayerCount] = useState(0)
  const [currentLayer, setCurrentLayer] = useState(0)
  const [tileSelection, setTileSelection] = useState([0,0])
  const [grid, setGrid] = useState([]);
  const [isMouseDown, setMouseDown] = useState(false)
  //var location = useLocation();

  // useEffect(() => {
  //   let tempGrid = [];
  //   let counter = 0;
  //   for (let row = 0; row < 64; row++) {
  //     const currentRow = [];

  //     for (let col = 0; col < 64; col++) {
  //       currentRow.push(
  //         <EditMapGridCell
  //           id={counter}
  //           width={gridSize.x}
  //           height={gridSize.y}
  //         />
  //       );
  //       counter++;
  //     }
  //     tempGrid.push(currentRow);
  //   }
  //   setGrid(tempGrid);
  //   const getMap = async () => {
  //     setLoading(true);
  //     await Axios.get(
  //       "https://maptile1.herokuapp.com/map/get/" + location.state._id
  //     ).then((response) => {
  //       setMap(response.data.map);
  //       setLoading(false);
  //     });
  //   };
  //   getMap();
  // }, [gridSize]);
  useEffect(()=> {
    console.log()
    if(layers[0].data.length === 0){
      initMap();
    }
  },[])

  const initMap = () => {
    // ! GIGA HARD CODE -- Self Explanatory but replace temp width and height with actual values
    let tempW = 64
    let tempH = 64

    layers.forEach((layer) => {
      for(let i = 0;i< tempW*tempH;i++){
        layer.data.push(0)
      }
    })
    
    console.log(layers)
    initDraw()
  }

  const initDraw = () => {
    let canvas = document.querySelector("canvas")
    let ctx = canvas.getContext("2d")
    let tilesetImage = document.querySelector("#tileset-source");
    ctx.clearRect(0,0,canvas.width, canvas.height)
    // ! GIGA HARD CODE -- Replace 16 with Tile Size
    let crop_size = 16
    tilesetImage.onload = function () {
      
    layers.forEach((layer) => {
      layer.data.forEach((tile, i) => {
        // ! GIGA HARD CODE -- Replace 64 with Map Width and Height
        let x = i % 64
        let y = Math.floor((i - x) / 64)

        if(tile === 0){
          // ! GIGA HARD CODE -- Replace 16 with Tile width and height
          ctx.globalAlpha = 0
          ctx.drawImage(
            tilesetImage,
            100,
            100,
            crop_size,
            crop_size,
            x * 16,
            y * 16,
            crop_size,
            crop_size
          )
          ctx.globalAlpha = 1
          ctx.strokeStyle = '#000000';  // some color/style
          ctx.lineWidth = 1; 
          ctx.strokeRect(x * 16,y * 16, crop_size, crop_size)
        }
        else{
          // ! GIGA HARD CODE -- Replace 64/16 with TilesetWidth/TileWidth or Height, Replace 16 with Tile Size
          let tileX = i % (64/16)
          let tileY = Math.floor((tile - x) / (64/16))
          ctx.drawImage(
            tilesetImage,
            tileX * 16,
            tileY * 16,
            crop_size,
            crop_size,
            x * 16,
            y * 16,
            crop_size,
            crop_size
          )
          ctx.strokeStyle = '#000000';  // some color/style
          ctx.lineWidth = 1; 
          ctx.strokeRect(x * 16,y * 16, crop_size, crop_size)
        }
        
      })
    })
    }
  }

  const draw = () => {
    let canvas = document.querySelector("canvas")
    let ctx = canvas.getContext("2d")
    let tilesetImage = document.querySelector("#tileset-source");
    ctx.clearRect(0,0,canvas.width, canvas.height)
    // ! GIGA HARD CODE -- Replace 16 with Tile Size
    let crop_size = 16
     
    layers.forEach((layer)=>{
      layer.data.forEach((tile,i)=>{
        // ! GIGA HARD CODE -- Replace 64 with Map Width and Height
        let x = i % 64
        let y = Math.floor((i - x) / 64)
        // ! GIGA HARD CODE -- Replace 64/16 with TilesetWidth/TileWidth or Height, Replace 16 with Tile Size
        let tileX = tile % (64/16)
        let tileY = Math.floor((tile - tileX) / (64/16))
        if(tile === 0){
          ctx.globalAlpha = 0
          ctx.drawImage(
            tilesetImage,
            1000,
            1000,
            crop_size,
            crop_size,
            x * 16,
            y * 16,
            crop_size,
            crop_size
          )
          ctx.globalAlpha = 1
          ctx.strokeStyle = '#000000';  // some color/style
          ctx.lineWidth = 1; 
          ctx.opacity = 0.5;
          ctx.strokeRect(x * 16,y * 16, crop_size, crop_size)
        }
        else{

          tileX = (tile - 1) % (64/16)
          tileY = Math.floor(((tile - 1) - tileX) / (64/16))
          ctx.drawImage(
            tilesetImage,
            tileX * 16,
            tileY * 16,
            crop_size,
            crop_size,
            x * 16,
            y * 16,
            crop_size,
            crop_size
          )
          ctx.strokeStyle = '#000000';  // some color/style
          ctx.lineWidth = 1; 
          ctx.strokeRect(x * 16,y * 16, crop_size, crop_size)
        }
      })
    })
  }

  const placeTile = (e) => {
    let clicked = getCoords(e)
    // ! GIGA HARD CODE -- Replace 64 with Map Height
    let id = clicked[0] + clicked[1] * 64
    if(e.shiftKey) {
      layers[currentLayer].data[id] = 0
    }
    else{
      // ! GIGA HARD CODE -- Replace 64/16 with TilesetHeight/TileHeight
      layers[currentLayer].data[id] = (tileSelection[0] + (tileSelection[1] * 64/16)) + 1 
    }
    draw()
  }

  function getCoords(e) {
    const { x, y } = e.target.getBoundingClientRect();
    const mouseX = e.clientX - x;
    const mouseY = e.clientY - y;
    // ! GIGA HARD CODE -- Replace 16 with Tile Size (width and height [will be same number])
    return [Math.floor(mouseX / 16), Math.floor(mouseY / 16)];
  }

  const tilesetClick = (e) => {
    let tilesetSelection = document.querySelector(".tile-selector");
    let newCoords = getCoords(e)
    // ! GIGA HARD CODE -- Replace 64/16 with MapWidth/TileWidth and MapHeight/TileHeight respectivly
    if(!(newCoords[0] >=64/16) && !(newCoords[1] >=64/16)){
      setTileSelection(newCoords)
      // ! GIGA HARD CODE -- Replace 16 with Tile Size
      tilesetSelection.style.left = newCoords[0] * 16 + "px"
      tilesetSelection.style.top = newCoords[1] * 16 + "px"
    }
  }
    

  const zoom = (factor) => {
    if (gridSize.x + factor * 10 <= 60 && gridSize.x + factor * 10 >= 20) {
      setGridSize({ x: gridSize.x + factor * 10, y: gridSize.y + factor * 10 });
    }
  };
  const updateMap = (map) => {
    setMap(map);
  };

  const handleShare = async (email) => {
    await Axios.post("https://maptile1.herokuapp.com/user/share", {
      type: "map",
      email: email,
      id: map._id,
    })
      .then((response) => {
        alert("Shared Map");
      })
      .catch((error) => {
        alert("No user with that email");
      });
  };

  const addNewLayer = () => {
    let newLayer = {name:layers.length + 1,data:[], active:true, customProp:{type: "", value:""},id:layers.length}
    for(let i = 0;i< 64*64;i++){
      newLayer.data.push(0)
    }
    setLayers([...layers, newLayer])
  }

  // * Canvas Listeners
  const canvasMouseDown = (e) => {
    setMouseDown(true)
    placeTile(e)
  }
  const canvasMouseUp = () => {
    setMouseDown(false)
  }
  const canvasMouseLeave = () => {
    setMouseDown(false)
  }
  const canvasMouseMove = (e) => {
    if(isMouseDown){
      placeTile(e)
    }
  }

  return (
    <div>
      <Sidebar setTheUser={props.setTheUser} />
      {!loading && (
        <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-top bg-maptile-background-dark text-white">
          <div className="pt-5 text-center text-4xl font-bold text-white underline">
          </div>
          <div className="flex flex-col h-[53rem] w-5/6 items-left justify-top ml-20 mt-10">
            <div className="grid grid-cols-10 w-full justify-items-end">
              <div className="col-start-8 justify-items-start flex flex-row">
                <button
                  className="text-4xl text-maptile-green cursor-pointer"
                  onClick={() => zoom(-1)}
                >
                  -
                </button>
                <button
                  className="ml-5 mr-[-40px] text-4xl text-maptile-green cursor-pointer"
                  onClick={() => zoom(1)}
                >
                  +
                </button>
              </div>
              <div className="col-start-10 flex flex-row ">
                <EditMapMenu
                  setMapPropModal={setMapPropModal}
                  setShareModal={setShareModal}
                />
              </div>
            </div>

            <div className="flex flew-row">
              <div className="bg-maptile-background-mid w-5/6 h-[50rem]  overflow-x-auto">
                <div className="flex flex-wrap overflow-auto">
                  <canvas width={16*64} height={16*64} 
                    onMouseDown={canvasMouseDown}
                    onMouseUp={canvasMouseUp}
                    onMouseMove={canvasMouseMove}
                    onMouseLeave={canvasMouseLeave}
                    className="bg-white bg-opacity-60"
                  ></canvas>
                </div>
              </div>
              <div className="flex flex-col w-1/6 ml-2 h-[50rem]">
                <div className="bg-maptile-background-mid w-full h-1/2 rounded-xl overflow-auto">
                  <div className="flex flex-row">
                    <div className="text-white text-2xl text-left w-1/2 underline ml-5">
                      Layers
                    </div>
                    <div className="text-maptile-green text-2xl text-right w-1/2 mr-5 cursor-pointer" onClick={()=>addNewLayer()}>
                      +
                    </div>
                  </div>
                  
                  <div className="bg-maptile-background-bright w-5/6 h-5/6 ml-5 mt-5 rounded-xl overflow-auto">
                    {layers.slice(0).reverse().map((layer, i) => {
                      return <LayerCard name={layer.name} id={layer.id} active={layer.id === currentLayer} changeLayer={setCurrentLayer}/>;
                    })}
                  </div>
                </div>
                <div className="bg-maptile-background-mid w-full h-1/2 rounded-xl overflow-auto mt-2">
                  <div className="text-white text-2xl text-center w-full underline">
                    Tiles
                  </div>
                  <div className="bg-maptile-background-bright w-5/6 h-5/6 ml-5 mt-5 rounded-xl relative" onMouseDown={tilesetClick}>
                    {/* {tempTiles.map((tile) => (
                      <EditMapTileDisplay tile={tile} />
                    ))} */}
                    <div className={`absolute tile-selector left-0 top-0 w-[16px] h-[16px] p-2 z-30`}></div>
                    <img id="tileset-source" className="" style={{ "imageRendering": "pixelated" }}src={"https://maptilefiles.blob.core.windows.net/maptile-tileset-image/637287cbdf17e9e9316f1cf6"}crossOrigin="true" alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ShareModal
            modalOpen={shareModalOpen}
            setShareModal={setShareModal}
            handleShare={handleShare}
          />

          {/* <MapPropModal
            mapPropModal={mapPropModal}
            setMapPropModal={setMapPropModal}
            updateMap={updateMap}
            map={map}
          /> */}
        </main>
      )}
    </div>
  );
};

export default EditMap;
