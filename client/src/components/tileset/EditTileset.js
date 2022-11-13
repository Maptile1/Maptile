import Sidebar from "../sidebar/Sidebar"
import EditTilesetMenu from "./EditTilesetMenu";
import ShareModal from "../map/ShareModal";
import TilesetPropModal from "./TilesetPropModal"
import React, { useState, useEffect } from "react"
import Axios from "axios";
import { useLocation } from 'react-router-dom';
import { Stage, Layer, Rect } from 'react-konva';
import { SketchPicker } from 'react-color'
import { BsFillBrushFill, BsFillEraserFill } from "react-icons/bs";


const EditTileset = (props) => {
    const [shareModalOpen, setShareModal] = useState(false)
    const [tilesetPropModalOpen, setTilesetPropModal] = useState(false)
    var location = useLocation();
    const [tileset, setTileset] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fillColor, setFillColor] = useState("#000000")
    const [zoomLevel, setZoomLevel] = useState(15)
    const [tool, setTool] = useState("brush")
    useEffect(() => {
        const getTileset = async () => {
            setLoading(true)

            let tilesetdata = await Axios.get("https://maptile1.herokuapp.com/tileset/get/" + location.state._id)

            if (tilesetdata.data.tileset.tileset_data.length === 0) {
                tilesetdata.data.tileset.tileset_data.push(initTileset(tilesetdata.data.tileset))
            }
            setTileset(tilesetdata.data.tileset);
            setLoading(false);
        }
        getTileset()
    }, [location.state._id]);
    console.log(tileset.tileset_data[0].data)
    const initTileset = (tileset) => {
        let initLayer = { layer: 1, data: [] }
        let id_count = 0
        console.log(tileset.tileset_height)
        console.log(tileset.tileset_width)
        console.log(tileset)
        for (let i = 0; i < tileset.tileset_height; i++) {
            let row = { row_id: i, row_data: [] }
            for (let j = 0; j < tileset.tileset_width; j++) {
                row.row_data.push({ id: id_count, color: "white" })
                id_count++
            }
            initLayer.data.push(row)
        }
        return initLayer
    }

    const updateTileset = (tileset) => {
        setTileset(tileset)
    }

    var mouseDown = 0;
    document.body.onmousedown = function () {
        ++mouseDown;
    }
    document.body.onmouseup = function () {
        --mouseDown;
    }

    document.body.onwheel = function (e) {
        if (e.deltaY > 0 && e.altKey) {
            e.preventDefault()
            updateZoom(-1)
        }
        else if (e.deltaY < 0 && e.altKey) {
            e.preventDefault()
            updateZoom(1)
        }
    }

    const cellmouseOver = (e) => {
        if (mouseDown) {
            if (tool === "brush") {
                e.target.fill(fillColor)
            }
            else if (tool === "eraser") {
                e.target.fill("white")
            }
        }
    }

    const cellOnClick = (e) => {
        if (mouseDown) {
            if (tool === "brush") {
                e.target.fill(fillColor)
            }
            else if (tool === "eraser") {
                e.target.fill("white")
            }
        }
    }

    const updateFillColor = (color) => {
        setFillColor(color.hex)
    }

    const updateZoom = (zoom) => {
        console.log(zoomLevel)
        if (zoom === 1) {
            if (zoomLevel + 5 !== 35) {
                setZoomLevel(zoomLevel + 5)
            }
        }
        if (zoom === -1) {
            if (zoomLevel - 5 !== 5) {
                setZoomLevel(zoomLevel - 5)
            }

        }
    }
    const stageRef = React.useRef(null);
    //mr-2 h-5 w-5 cursor-pointer mt-[10px] mr-[80px]

    const exportTileset = () => {
        const uri = stageRef.toDataURL();
        downloadURI(uri, 'stage.png')
    }


    const downloadURI = (uri, name) => {
        var link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return (
        <div>
            {!loading ? (
                <div>
                    <Sidebar />
                    <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-top bg-maptile-background-dark text-white">
                        <div className="pt-5 text-center text-4xl font-bold text-white underline">{tileset.name}</div>
                        <div className="flex flex-col h-[53rem] w-5/6 items-left justify-top ml-20 mt-10">

                            <div className="grid grid-cols-10 w-full justify-items-end">
                                <div className="col-start-1 justtify-items-start flex flex-row">
                                    <BsFillBrushFill className={`${tool === "brush" ? 'mr-2 h-5 w-5 cursor-pointer mt-[10px] mr-[20px] text-maptile-green' : 'mr-2 h-5 w-5 cursor-pointer mt-[10px] mr-[20px]'}`} onClick={() => setTool("brush")} />
                                    <BsFillEraserFill className={`${tool === "eraser" ? 'mr-2 h-5 w-5 cursor-pointer mt-[10px] mr-[80px] text-maptile-green' : 'mr-2 h-5 w-5 cursor-pointer mt-[10px] mr-[80px]'}`} onClick={() => setTool("eraser")} />
                                </div>
                                <div className="col-start-8 justify-items-start flex flex-row">
                                    <button className="text-4xl text-maptile-green cursor-pointer" onClick={() => updateZoom(-1)}>-</button>
                                    <button className="ml-5 mr-[-40px] text-4xl text-maptile-green cursor-pointer" onClick={() => updateZoom(1)}>+</button>
                                </div>
                                <div className="col-start-10 flex flex-row ">
                                    <EditTilesetMenu exportTileset={exportTileset} setShareModal={setShareModal} setTilesetPropModal={setTilesetPropModal} />
                                </div>

                            </div>

                            <div className="flex flew-row">
                                <div className="bg-maptile-background-mid w-full h-[50rem] rounded-xl overflow-auto">
                                    <Stage ref={stageRef} width={tileset.tileset_width * zoomLevel} height={tileset.tileset_height * zoomLevel} scaleX={zoomLevel} scaleY={zoomLevel}>
                                        {tileset.tileset_data.map((layer) => {
                                            return (<Layer key={layer.layer}>
                                                {layer.data.map((row, i) => {
                                                    return (row.row_data.map((cell) => {
                                                        return (<Rect
                                                            x={(cell.id % tileset.tileset_width)}
                                                            y={(i % tileset.tileset_height)}
                                                            width={1}
                                                            height={1}
                                                            fill={cell.color}
                                                            shadowBlur={.05}
                                                            onMouseOver={cellmouseOver}
                                                            onClick={cellOnClick}
                                                        />)
                                                    })
                                                    )
                                                })}
                                            </Layer>)
                                        })}
                                    </Stage>
                                </div>
                                <div className="flex flex-col w-1/6 ml-2 h-[50rem]">
                                    <div className="w-full h-1/2 overflow-auto text-black">
                                        <SketchPicker
                                            color={fillColor}
                                            onChangeComplete={updateFillColor} />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <ShareModal modalOpen={shareModalOpen} setShareModal={setShareModal} name={tileset.name} />
                        <TilesetPropModal updateTileset={updateTileset} tilesetPropModalOpen={tilesetPropModalOpen} setTilesetPropModal={setTilesetPropModal} tileset={tileset} />
                    </main>
                </div>)
                : <div></div>
            }
        </div>
    )
}

export default EditTileset