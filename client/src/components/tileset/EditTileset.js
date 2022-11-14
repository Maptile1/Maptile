import Sidebar from "../sidebar/Sidebar"
import EditTilesetMenu from "./EditTilesetMenu";
import ShareModal from "../map/ShareModal";
import TilesetPropModal from "./TilesetPropModal"
import React, { useState, useEffect } from "react"
import Axios from "axios";
import { useLocation } from 'react-router-dom';
import { Stage, Layer, Rect, Line } from 'react-konva';
import { SketchPicker } from 'react-color'
import { BsFillBrushFill, BsFillEraserFill, BsPaintBucket, BsArrowCounterclockwise, BsArrowClockwise, BsEyedropper } from "react-icons/bs";
import { FiSave } from "react-icons/fi"

Axios.defaults.withCredentials = true

const EditTileset = (props) => {
    const [shareModalOpen, setShareModal] = useState(false)
    const [tilesetPropModalOpen, setTilesetPropModal] = useState(false)
    var location = useLocation();
    const [tileset, setTileset] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fillColor, setFillColor] = useState("#000000")
    const [zoomLevel, setZoomLevel] = useState(15)
    const [tool, setTool] = useState("brush")
    const [showDividers, setShowDividers] = useState(true)
    const [dividers, setDividers] = useState(null)
    const [undoStack] = useState([])
    const [redoStack] = useState([])
    const [download, setDownload] = useState(false);

    useEffect(() => {
        const getTileset = async () => {
            setLoading(true)

            let tilesetdata = await Axios.get("https://maptile1.herokuapp.com/tileset/get/" + location.state._id)

            if ((tilesetdata.data.tileset.tileset_data.length === 0) && (localStorage.getItem('imgData') === null)) {
                tilesetdata.data.tileset.tileset_data.push(initTileset(tilesetdata.data.tileset))
            }
            else if ((localStorage.getItem('imgData') !== null) && (tilesetdata.data.tileset.tileset_data.length === 0)) {
                tilesetdata.data.tileset.tileset_data.push(initImportTileset(tilesetdata.data.tileset))
            }
            setTileset(tilesetdata.data.tileset);
            setLoading(false);
        }
        getTileset()
    }, [location.state._id]);


    useEffect(() => {
        const newdividers = [];
        if (tileset !== null) {
            for (var i = tileset.tile_width; i < tileset.tileset_width; i += tileset.tile_width) {
                var points = [0, i, tileset.tileset_height, i];
                newdividers.push(<Line stroke='red' points={points} strokeWidth='0.05'></Line>)
            }
            for (var j = tileset.tile_height; j < tileset.tileset_height; j += tileset.tile_height) {
                var points2 = [j, 0, j, tileset.tileset_width];
                newdividers.push(<Line stroke='red' points={points2} strokeWidth='0.05'></Line>)
            }
            setDividers(newdividers)
        }
    }, [tileset])

    useEffect(() => {
        if (zoomLevel === 1 && showDividers === false && download) {
            var dataURL = stageRef.current.toDataURL();
            downloadURI(dataURL, 'maptile_tileset.png');
            setDownload(false)
            setZoomLevel(15)
            setShowDividers(true)
        }
        else if (zoomLevel === 1 && showDividers === false && !download) {
            stageRef.current.toBlob()
                .then((img) => {
                    const formData = new FormData()
                    formData.append('image', img)

                    Axios.post("https://maptile1.herokuapp.com/tileset/image/" + tileset._id, formData)
                        .then(function (response) {
                            console.log(response)
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                    setZoomLevel(15)
                    setShowDividers(true)
                })
        }
    }, [zoomLevel, showDividers])

    const initTileset = (tileset) => {
        let initLayer = { layer: 1, data: [] }
        let id_count = 0
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

    const initImportTileset = (tileset) => {
        var dataImage = localStorage.getItem('imgData');
        var image = document.createElement('img');
        image.src = dataImage;
        var canvas = document.createElement('canvas');
        canvas.width = tileset.tileset_width;
        canvas.height = tileset.tileset_height;

        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);

        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        let initLayer = { layer: 1, data: [] }
        let id_count = 0
        for (let i = 0; i < tileset.tileset_height; i++) {
            let row = { row_id: i, row_data: [] }
            for (let j = 0; j < tileset.tileset_width; j++) {
                row.row_data.push({ id: id_count, color: rgbToHex(imageData.data[(id_count * 4)], imageData.data[(id_count * 4) + 1], imageData.data[(id_count * 4) + 2]) })
                id_count++
            }
            initLayer.data.push(row)
        }
        return initLayer
    }

    const rgbToHex = (r, g, b) => {
        return "#" + valueToHex(r) + valueToHex(g) + valueToHex(b);
    }

    const valueToHex = (c) => {
        let hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
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

    const updateTilesetData = (id, color) => {
        tileset.tileset_data[0].data[Math.floor(id / tileset.tileset_height)].row_data[id % tileset.tileset_width].color = color
    }

    const fillUtil = (screen, x, y, color) => {
        if (x < 0 || x >= tileset.tileset_width || y < 0 || y >= tileset.tileset_height) {
            return
        }
        if (screen.data[y].row_data[x].color !== color) {
            return
        }

        screen.data[y].row_data[x].color = fillColor

        fillUtil(screen, x + 1, y, color)
        fillUtil(screen, x - 1, y, color)
        fillUtil(screen, x, y + 1, color)
        fillUtil(screen, x, y - 1, color)
    }

    const fill = (e) => {
        let cellid = Number(e.target.name())
        let color = e.target.fill()
        if (color === fillColor) {
            return
        }
        let x = cellid % tileset.tileset_width
        let y = Math.floor(cellid / tileset.tileset_height)

        let tileset_clone = { ...tileset }
        let data_clone = tileset_clone.tileset_data

        data_clone[0].data[y].row_data[x].color = color

        fillUtil(data_clone[0], x, y, color)

        setTileset(tileset_clone)
    }

    const cellmouseOver = (e) => {
        if (mouseDown) {
            if (tool === "brush") {
                addAction(e.target, e.target.fill(), fillColor)
                e.target.fill(fillColor)
                updateTilesetData(Number(e.target.name()), fillColor)
            }
            else if (tool === "eraser") {
                addAction(e.target, e.target.fill(), "white")
                e.target.fill("white")
                updateTilesetData(Number(e.target.name()), "white")
            }
        }
    }

    const cellOnClick = (e) => {

        if (tool === "brush") {
            addAction(e.target, e.target.fill(), fillColor)
            e.target.fill(fillColor)
            updateTilesetData(Number(e.target.name()), fillColor)
        }
        else if (tool === "eraser") {
            addAction(e.target, e.target.fill(), "white")
            e.target.fill("white")
            updateTilesetData(Number(e.target.name()), "white")
        }
        else if (tool === "fill") {
            fill(e)
        }
        else if (tool === "eyedropper") {
            setFillColor(e.target.fill())
        }

    }

    const addAction = (target, prevColor, newColor) => {
        undoStack.push({ target: target, prevColor: prevColor, newColor: newColor })
    }

    const undoAction = () => {
        if (undoStack.length !== 0) {
            let action = undoStack.pop()
            action.target.fill(action.prevColor)
            updateTilesetData(Number(action.target.name()), action.prevColor)
            redoStack.push(action)
        }
    }

    const redoAction = () => {
        if (redoStack.length !== 0) {
            let action = redoStack.pop()
            action.target.fill(action.newColor)
            updateTilesetData(Number(action.target.name()), action.newColor)
            undoStack.push(action)
        }
    }

    const updateFillColor = (color) => {
        setFillColor(color.hex)
    }

    const stageRef = React.useRef(null);

    const downloadURI = (uri, name) => {
        var link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

    const exportTileset = () => {
        //let prevZoom = zoomLevel
        setDownload(true)
        setZoomLevel(1)
        setShowDividers(false)

        // setZoomLevel(prevZoom)
        // setShowDividers(true)
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


    const saveTileset = async () => {
        let response = await Axios.post(
            "https://maptile1.herokuapp.com/tileset/update/" + tileset._id,
            {
                tileset_data: tileset.tileset_data,
                name: tileset.name,
                description: tileset.description,
                public: tileset.public,
                tags: tileset.tags
            }
        )
        setZoomLevel(1)
        setShowDividers(false)
        console.log(response);
    }

    // const TilesetImage = () => {
    //     var dataImage = localStorage.getItem('imgData');
    //     if(dataImage === null){
    //         console.log("no Image!")
    //     }
    //     else{
    //         var image = document.createElement('img');
    //         image.src = dataImage;
    //         var canvas = document.createElement('canvas');
    //         canvas.width = tileset.tileset_width;
    //         canvas.height = tileset.tileset_height;

    //         var context = canvas.getContext('2d');
    //         context.drawImage(image, 0, 0);

    //         var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    //         // Now you can access pixel data from imageData.data.
    //         // It's a one-dimensional array of RGBA values.
    //         // Here's an example of how to get a pixel's color at (x,y)
    //         // var index = (y*imageData.width + x) * 4;
    //         var red = imageData.data[0];
    //         var green = imageData.data[1];
    //         var blue = imageData.data[2];
    //         var alpha = imageData.data[3];
    //         console.log(red, green, blue, alpha)
    //     }
    //     return <img className="hidden" alt="" src={dataImage} />;

    // };"mr-2 h-5 w-5 cursor-pointer mt-[10px] text-maptile-green"

    return (
        <div>
            {!loading ? (
                <div>
                    <Sidebar />
                    <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-top bg-maptile-background-dark text-white">
                        <div className="pt-5 text-center text-4xl font-bold text-white underline">{tileset.name}</div>
                        <div className="flex flex-col h-[53rem] w-5/6 items-left justify-top ml-20 mt-10">

                            <div className="grid grid-cols-10 w-full justify-items-end">
                                <div className="col-start-1 justify-items-start flex flex-row">
                                    <BsFillBrushFill className={`${tool === "brush" ? 'mr-2 h-5 w-5 cursor-pointer mt-[14px] text-maptile-green' : 'mr-2 h-5 w-5 cursor-pointer mt-[14px]'}`} onClick={() => setTool("brush")} />
                                    <BsFillEraserFill className={`${tool === "eraser" ? 'mr-2 h-5 w-5 cursor-pointer mt-[14px] text-maptile-green' : 'mr-2 h-5 w-5 cursor-pointer mt-[14px]'}`} onClick={() => setTool("eraser")} />
                                    <BsPaintBucket className={`${tool === "fill" ? 'mr-2 h-5 w-5 cursor-pointer mt-[14px] mr-[60px] text-maptile-green' : 'mr-2 h-5 w-5 cursor-pointer mt-[14px] mr-[60px]'}`} onClick={() => setTool("fill")} />

                                </div>
                                <div className="col-start-2 justify-items-start flex flex-row">
                                    <BsArrowCounterclockwise className="mr-2 h-5 w-5 cursor-pointer mt-[15px]" onClick={() => undoAction()} />
                                    <BsArrowClockwise className="mr-2 h-5 w-5 cursor-pointer mt-[15px] mr-[140px]" onClick={() => redoAction()} />
                                </div>
                                <div className="col-start-8 justify-items-start flex flex-row">
                                    <button className="text-4xl text-maptile-green cursor-pointer" onClick={() => updateZoom(-1)}>-</button>
                                    <button className="ml-5 mr-[-40px] text-4xl text-maptile-green cursor-pointer" onClick={() => updateZoom(1)}>+</button>
                                </div>
                                <div className="col-start-9 flex flex-row ">
                                    <BsEyedropper className={`${tool === "eyedropper" ? 'mr-2 h-5 w-5 cursor-pointer mt-[14px] mr-[40px] text-maptile-green' : 'mr-2 h-5 w-5 cursor-pointer mt-[14px] mr-[40px]'}`} onClick={() => setTool("eyedropper")} />
                                </div>
                                <div className="col-start-10 flex flex-row ">
                                    <FiSave onClick={() => saveTileset()} className="mt-[10px] h-5 w-5 text-maptile-green" />
                                    <EditTilesetMenu exportTileset={exportTileset} setShareModal={setShareModal} setTilesetPropModal={setTilesetPropModal} />
                                </div>

                            </div>

                            <div className="flex flew-row">
                                <div className="bg-maptile-background-mid w-full h-[50rem] rounded-xl overflow-auto">
                                    <Stage ref={stageRef} width={tileset.tileset_width * zoomLevel} height={tileset.tileset_height * zoomLevel} scaleX={zoomLevel} scaleY={zoomLevel}>
                                        {tileset.tileset_data.map((layer) => {
                                            return (<Layer key={layer.layer}>
                                                {layer.data.map((row, i) => {
                                                    return (row.row_data.map((cell, j) => {
                                                        return (<Rect
                                                            name={cell.id.toString()}
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
                                        <Layer>
                                            {showDividers && dividers}
                                        </Layer>
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
                </div >)
                : <div></div>
            }
        </div >
    )
}

export default EditTileset