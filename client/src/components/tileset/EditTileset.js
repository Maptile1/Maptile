import Sidebar from "../sidebar/Sidebar"
import EditTilesetMenu from "./EditTilesetMenu";
import ShareModal from "../map/ShareModal";
import TilesetPropModal from "./TilesetPropModal"
import { React, useState, useEffect } from "react"
import Axios from "axios";
import { useLocation } from 'react-router-dom';
const EditTileset = (props) => {
    const [shareModalOpen, setShareModal] = useState(false)
    const [tilesetPropModalOpen, setTilesetPropModal] = useState(false)
    var location = useLocation();
    const [tileset, setTileset] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getTileset = async () => {
            setLoading(true)

            let tilesetdata = await Axios.get("https://maptile1.herokuapp.com/tileset/get/" + location.state._id)
            setTileset(tilesetdata.data.tileset);
            setLoading(false);
        }
        getTileset()
    }, []);
    const updateTileset = (tileset) => {
        setTileset(tileset)
    }
    return (
        <div>
            {!loading ? (
                <div>
                    <Sidebar />
                    <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-top bg-maptile-background-dark text-white">
                        <div className="pt-5 text-center text-4xl font-bold text-white underline">{tileset.name}</div>
                        <div className="flex flex-col h-[53rem] w-5/6 items-left justify-top ml-20 mt-10">
                            <EditTilesetMenu setShareModal={setShareModal} setTilesetPropModal={setTilesetPropModal} />

                            <div className="bg-maptile-background-mid w-full h-[53rem] rounded-xl overflow-auto">
                                <img src="canvas.png" class="object-fill h-[53rem] w-full" alt=""></img>
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