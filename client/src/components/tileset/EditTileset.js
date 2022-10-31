import Sidebar from "../sidebar/Sidebar"
import { BiShareAlt ,BiCog, BiDownload} from "react-icons/bi"
import { MdDriveFileRenameOutline} from "react-icons/md"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import ShareModal from "../map/ShareModal";
import {React, useState} from "react"

const EditTileset = (props) => {
    const [shareModalOpen, setShareModal] = useState(false)
    return(
        <div>
            <Sidebar />
            <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-top bg-maptile-background-dark text-white">
                <div className="pt-5 text-center text-4xl font-bold text-white underline">Tileset Name</div>
                <div className="flex flex-col h-[53rem] w-5/6 items-left justify-top ml-20 mt-10">
                    
                    <Menu as="div" className=" relative inline-block text-right">
                    <div>
                            <Menu.Button className=" inline-flex w-full items-center justify-top rounded-md bg-opacity-20 px-4 py-2 text-5xl font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                <BiCog className="mr-2 h-5 w-5" aria-hidden="true"></BiCog>

                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className=" absolute bottom-200 left-0 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                {active ? (
                                                    <MdDriveFileRenameOutline
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <MdDriveFileRenameOutline
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                Rename
                                            </button>
                                        )}
                                </Menu.Item>
                                <Menu.Item>
                                        {({ active }) => (
                                            <button onClick={()=>setShareModal(true)}
                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                {active ? (
                                                    <BiShareAlt
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <BiShareAlt
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                Share
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                {active ? (
                                                    <BiDownload
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <BiDownload
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                Share
                                            </button>
                                        )}
                                    </Menu.Item>
                            </Menu.Items>
                            
                        </Transition>
                    </Menu>
                    <div className="bg-maptile-background-mid w-full h-[53rem] rounded-xl overflow-auto">

                    </div>
                    
                </div>
                <ShareModal modalOpen={shareModalOpen} setShareModal={setShareModal} />
            </main>
        </div>
    )
}

export default EditTileset