import { Menu, Transition } from "@headlessui/react";
// import { BiShareAlt } from "react-icons/bi"
import { FiEdit } from "react-icons/fi";
import { MdDriveFileRenameOutline, MdDelete } from "react-icons/md";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const TSSCard = (props) => {
  const nav = useNavigate();
  const handleTilesetView = () => {
    nav("/tileset_edit", { state: { _id: props._id } });
  };
  const handleTilesetDisplay = () => {
    nav("/tilesetdisplay", { state: { owner: props.owner, _id: props._id } });
  };
  const handleDelete = async () => {
    props.handleDelete(props._id);
  };

  return (
    <div class="max-w-sm rounded overflow-hidden mt-5 mx-14">
      {props.search ? (
        <img
          onClick={() => handleTilesetDisplay()}
          class="w-full border border-white cursor-pointer"
          src="https://images.gnwcdn.com/2020/usgamer/A-Link-to-the-Past-Map-Header1-05292020.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/the-20-best-in-game-maps.jpg"
          alt=""
        />
      ) : (
        <img
          onClick={() => handleTilesetView()}
          class="w-full border border-white cursor-pointer"
          src="https://images.gnwcdn.com/2020/usgamer/A-Link-to-the-Past-Map-Header1-05292020.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/the-20-best-in-game-maps.jpg"
          alt=""
        />
      )}

      <div class="grid grid-cols-4">
        {props.search ? (
          <div
            onClick={() => handleTilesetDisplay()}
            class="col-start-1 col-span-3 text-center ml-20 text-white text-xl underline mt-5 cursor-pointer"
          >
            {" "}
            {props.name}
          </div>
        ) : (
          <div
            onClick={() => handleTilesetView()}
            class="col-start-1 col-span-3 text-center text-white text-xl underline mt-5 cursor-pointer"
          >
            {" "}
            {props.name}
          </div>
        )}
        <div>
          {!props.search && (
            <Menu
              as="div"
              className="col-start-3 relative inline-block text-right"
            >
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
                <Menu.Items className=" absolute bottom-0 right-0 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active
                            ? "bg-violet-500 text-white"
                            : "text-gray-900"
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
                        <button
                          onClick={() => handleDelete()}
                          className={`${active
                            ? "bg-violet-500 text-white"
                            : "text-gray-900"
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
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleTilesetView}
                          className={`${active
                            ? "bg-violet-500 text-white"
                            : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <FiEdit
                              className="mr-2 h-5 w-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <FiEdit
                              className="mr-2 h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                    {/* <Menu.Item>
                                            {({ active }) => (
                                                <button onClick={() => props.setShareModal(true)}
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
                                        </Menu.Item> */}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      </div>
    </div>
  );
};

export default TSSCard;
