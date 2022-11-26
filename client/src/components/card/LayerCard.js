import { BiCog } from "react-icons/bi"
import { MdDriveFileRenameOutline, MdDelete} from "react-icons/md"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'


const LayerCard =(props) => {
    return(
    <Menu as="div" className=" relative inline-block text-left ">
    <div className="grid grid-cols-2 justify-items-start mb-10" onClick={()=>props.changeLayer(props.id)}>
        {props.active ? 
        <div className="col-start-1 text-center text-2xl p-2 underline cursor-pointer text-maptile-green">
            {props.name}
        </div>
        :
        <div className="col-start-1 text-center text-2xl p-2 underline cursor-pointer text-white">
            {props.name}
        </div>}
        
            <Menu.Button className="col-start-2 inline-flex items-center justify-top rounded-md bg-opacity-20 px-4 py-2 text-5xl font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <BiCog className="mr-2 h-5 w-5"aria-hidden="true"/>

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
            <Menu.Items className=" absolute bottom-[-50px] left-[120px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-visible">
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
                            <button className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                {active ? (
                                    <BiCog
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <BiCog
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                )}
                                Custom Options
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                {active ? (
                                                    <MdDelete
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <MdDelete
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                Delete
                                            </button>
                                        )}
                                    </Menu.Item>
            </Menu.Items>
            
        </Transition>
    </Menu>)
}

export default LayerCard