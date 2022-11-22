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
  const [loading, setLoading] = useState(true);
  const [mapPropModal, setMapPropModal] = useState(false);
  const [map, setMap] = useState(null);
  const [gridSize, setGridSize] = useState({ x: 20, y: 20 });
  const tempTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const tempLayers = [
    "Layer1",
    "Layer2",
    "Layer3",
    "Layer4",
    "Layer5",
    "Layer6",
  ];
  const [grid, setGrid] = useState([]);
  var location = useLocation();
  console.log(map);

  useEffect(() => {
    let tempGrid = [];
    let counter = 0;
    for (let row = 0; row < 64; row++) {
      const currentRow = [];

      for (let col = 0; col < 64; col++) {
        currentRow.push(
          <EditMapGridCell
            id={counter}
            width={gridSize.x}
            height={gridSize.y}
          />
        );
        counter++;
      }
      tempGrid.push(currentRow);
    }
    setGrid(tempGrid);
    const getMap = async () => {
      setLoading(true);
      await Axios.get(
        "https://maptile1.herokuapp.com/map/get/" + location.state._id
      ).then((response) => {
        setMap(response.data.map);
        setLoading(false);
      });
    };
    getMap();
  }, [gridSize]);
  console.log(map);
  const zoom = (factor) => {
    if (gridSize.x + factor * 10 <= 60 && gridSize.x + factor * 10 >= 20) {
      setGridSize({ x: gridSize.x + factor * 10, y: gridSize.y + factor * 10 });
    }
  };
  console.log(mapPropModal);
  return (
    <div>
      <Sidebar />
      {!loading && (
        <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-top bg-maptile-background-dark text-white">
          <div className="pt-5 text-center text-4xl font-bold text-white underline">
            {map.name}
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
                  {grid.map((row, rowID) => {
                    return (
                      <div key={rowID} className="flex flex-row ">
                        {row.map((cell) => {
                          return cell;
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col w-1/6 ml-2 h-[50rem]">
                <div className="bg-maptile-background-mid w-full h-1/2 rounded-xl overflow-auto">
                  <div className="text-white text-2xl text-center w-full underline">
                    Layers
                  </div>
                  <div className="bg-maptile-background-bright w-5/6 h-5/6 ml-5 mt-5 rounded-xl overflow-auto">
                    {tempLayers.map((layer) => {
                      return <LayerCard name={layer} />;
                    })}
                  </div>
                </div>
                <div className="bg-maptile-background-mid w-full h-1/2 rounded-xl overflow-auto mt-2">
                  <div className="text-white text-2xl text-center w-full underline">
                    Tiles
                  </div>
                  <div className="bg-maptile-background-bright w-5/6 h-5/6 ml-5 mt-5 p-2 rounded-xl flex flex-wrap overflow-auto">
                    {tempTiles.map((tile) => (
                      <EditMapTileDisplay tile={tile} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ShareModal
            modalOpen={shareModalOpen}
            setShareModal={setShareModal}
          />
          <MapPropModal
            mapPropModal={mapPropModal}
            setMapPropModal={setMapPropModal}
            map={map}
          />
        </main>
      )}
    </div>
  );
};

export default EditMap;
