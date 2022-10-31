import Sidebar from "../sidebar/Sidebar"
import EditMapMenu from "./EditMapMenu"
import ShareModal from "./ShareModal"
import {React, useState} from "react"

const EditMap = (props) => {
    const [shareModalOpen, setShareModal] = useState(false)
    return(
        <div>
            <Sidebar />
            <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-top bg-maptile-background-dark text-white">
                <div className="pt-5 text-center text-4xl font-bold text-white underline">Map Name</div>
                <div className="flex flex-col h-[53rem] w-5/6 items-left justify-top ml-20 mt-10">
                    
                    <EditMapMenu setShareModal={setShareModal}/>
                    <div className="bg-maptile-background-mid w-full h-[53rem] rounded-xl overflow-auto">

                    </div>
                    
                </div>
                <ShareModal modalOpen={shareModalOpen} setShareModal={setShareModal} />
            </main>
        </div>
    )
}

export default EditMap