
import { Menu, Transition } from '@headlessui/react'
import { BsSave } from "react-icons/bs"
import { BiEdit } from "react-icons/bi"
import { MdOutlineContentCopy } from "react-icons/md"
import { Fragment } from 'react'

const TSSCard = (props) => {
    return (
        <div class="max-w-sm rounded overflow-hidden mt-5 mx-14">
            <img class="w-full border border-white" src="https://images.gnwcdn.com/2020/usgamer/A-Link-to-the-Past-Map-Header1-05292020.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/the-20-best-in-game-maps.jpg" alt="" />
            <div class="grid grid-cols-4">
                <div class='col-start-1 col-span-2 text-center text-white text-xl underline mt-5'> GREATEST TILESET</div>
                <div>
                    <Menu as="div" className="col-start-2 relative inline-block text-right">
                        <div>
                            <Menu.Button className=" inline-flex w-full justify-center rounded-md bg-opacity-20 px-4 py-2 text-5xl font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                ...

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
                            <Menu.Items className=" left-0 mt-2 w-56 origin-top-right  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1 ">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                {active ? (
                                                    <BiEdit
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <BiEdit
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                Edit
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
                                                    <MdOutlineContentCopy
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <MdOutlineContentCopy
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                Save to Shared
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
                                                    <BsSave
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <BsSave
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                Download
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>

                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div >
    );
};

export default TSSCard;