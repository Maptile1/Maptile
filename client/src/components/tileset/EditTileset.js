import Sidebar from "../sidebar/Sidebar"
import EditTilesetMenu from "./EditTilesetMenu";
import ShareModal from "../map/ShareModal";
import { React, useState } from "react"

const EditTileset = (props) => {
    const [shareModalOpen, setShareModal] = useState(false)
    return (
        <div>
            <Sidebar />
            <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-top bg-maptile-background-dark text-white">
                <div className="pt-5 text-center text-4xl font-bold text-white underline">Tileset Name</div>
                <div className="flex flex-col h-[53rem] w-5/6 items-left justify-top ml-20 mt-10">
                    <EditTilesetMenu setShareModal={setShareModal} />

                    <div className="bg-maptile-background-mid w-full h-[53rem] rounded-xl overflow-auto">
                        <img src="canvas.png" class="object-fill h-[53rem] w-full" alt=""></img>
                    </div>

                </div>
                <ShareModal modalOpen={shareModalOpen} setShareModal={setShareModal} />
            </main>
        </div>
    )
}

export default EditTileset