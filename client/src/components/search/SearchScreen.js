import Sidebar from "../sidebar/Sidebar";
import React, { useState, useEffect, useRef } from "react";
import SearchCard from "../card/SearchCard";
import Axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";
Axios.defaults.withCredentials = true;

const SearchScreen = (props) => {
  const [userSelected, updateUserSelected] = useState(true);
  var [searchResults, setSearchResults] = useState([]);
  let tab_selected =
    "bg-maptile-background-mid text-center rounded-t-xl cursor-pointer  mt-[10px] duration-300";
  let tab_unselected =
    "bg-maptile-tab-unselected text-center rounded-t-xl cursor-pointer duration-300";
  const [currentPage, setCurrentPage] = useState(0);
  const user = props.user;
  const location = useLocation();
  var itemsPerPage = 6;
  const searchRef = useRef(null);
  const tagRef = useRef(null);
  const [tags, setTags] = useState([]);
  const [resultCount, setResultCount] = useState(0);
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      let selectedTags = [];
      let tagChoices = document.getElementsByName("tagBox");
      for (let i = 0; tagChoices[i]; i++) {
        if (tagChoices[i].checked) {
          selectedTags.push(tagChoices[i].value);
        }
      }
      var response = Axios.post(
        "https://maptile1.herokuapp.com/tileset/search",
        {
          search: searchRef.current.value,
          limit: itemsPerPage,
          page: currentPage,
          tags: selectedTags,
        }
      ).then((response) => {
        console.log(response.data);
        setResultCount(response.data.count);
        setSearchResults(response.data.tilesets);
      });
    } else {
      didMount.current = true;
    }
  }, [currentPage]);

  const handleNextPageCall = () => {
    console.log((currentPage + 2) * itemsPerPage);
    console.log((currentPage + 2) * itemsPerPage - resultCount);
    if ((currentPage + 2) * itemsPerPage - resultCount >= itemsPerPage) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPageCall = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    if (currentPage === 0) {
      if (resultCount % itemsPerPage == 0) {
        setCurrentPage(Math.floor(resultCount / itemsPerPage - 1));
      } else {
        setCurrentPage(Math.floor(resultCount / itemsPerPage));
      }
    }
  };

  const getPaginatedData = () => {
    return searchResults;
  };

  const updateSelect = (boolean) => {
    updateUserSelected(boolean);
    handleSearch();
  };

  const handleSearch = async (e) => {
    let selectedTags = [];
    let tagChoices = document.getElementsByName("tagBox");
    for (let i = 0; tagChoices[i]; i++) {
      if (tagChoices[i].checked) {
        selectedTags.push(tagChoices[i].value);
      }
    }
    setCurrentPage(0);
    if (!userSelected) {
      var response = await Axios.post(
        "https://maptile1.herokuapp.com/tileset/search",
        {
          search: searchRef.current.value,
          limit: itemsPerPage,
          page: 0,
          tags: selectedTags,
        }
      );
      setResultCount(response.data.count);
      setSearchResults(response.data.tilesets);
    } else {
      var response = await Axios.post(
        "https://maptile1.herokuapp.com/map/search",
        {
          search: searchRef.current.value,
          limit: itemsPerPage,
          page: 0,
          tags: selectedTags,
        }
      );
      setResultCount(response.data.count);
      setSearchResults(response.data.maps);
    }
  };

  const handleAddTag = (e) => {
    if (
      tagRef.current.value != "" &&
      !tags.find((tag) => tag === tagRef.current.value)
    ) {
      setTags([...tags, tagRef.current.value]);
    }
    tagRef.current.value = "";
  };

  return user ? (
    <div>
      <Sidebar setTheUser={props.setTheUser} />
      <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-top bg-maptile-background-dark text-white">
        <div className="pt-5 text-center text-4xl font-bold text-white">
          Search
        </div>
        <div className="flex flex-col h-[53rem] w-5/6 items-left justify-top ml-20 mt-10">
          <div class="grid grid-cols-4">
            <div className="mb-10 col-start-4 col-span-3">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
              >
                Search
              </label>
              <div className="relative w-100">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  ref={searchRef}
                  type="search"
                  id="default-search"
                  class="block p-4 pl-10 w-full text-sm text-gray-900 bg-maptile-background-mid rounded-lg border border-gray-300 focus:ring-white-500 focus:border-black-500 dark:bg-maptile-background-mid dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Tilesets and Maps"
                  required
                />
                <button
                  onClick={() => handleSearch()}
                  className="text-white absolute right-2.5 bottom-2.5 bg-maptile-background-mid hover:bg-black focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-maptile-green dark:hover:bg-maptile-green-highlight dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-8 grid-rows-1 place-items-left w-full">
            <div
              className={`${userSelected ? tab_selected : tab_unselected}`}
              onClick={() => updateSelect(true)}
            >
              Tilesets
            </div>
            <div
              className={`${!userSelected ? tab_selected : tab_unselected}`}
              onClick={() => updateSelect(false)}
            >
              Maps
            </div>
            <div className="grid-col-8 cursor-pointer relative left-[800px] flex flex-row col-span-2">
              <AiOutlineDoubleLeft onClick={handlePrevPageCall} size={40} />

              <div className="mt-2">Page {currentPage + 1}</div>
              <AiOutlineDoubleRight onClick={handleNextPageCall} size={40} />
            </div>
          </div>
          <div className="bg-maptile-background-mid w-10/12 h-[50rem] rounded-r-xl rounded-b-xl overflow-y-auto overflow-x-hidden">
            <div className="flex flex-row flex-wrap py-20 left-[130px] relative gap-y-10 gap-x-5 ">
              {userSelected ? (
                searchResults.length !== 0 ? (
                  getPaginatedData().map((obj, index) => (
                    <SearchCard
                      search={true}
                      owner={obj.owner}
                      name={obj.name}
                      _id={obj._id}
                      type={"tileset"}
                    />
                  ))
                ) : (
                  <div>No Tileset Search Results</div>
                )
              ) : searchResults.length !== 0 ? (
                getPaginatedData().map((obj, index) => (
                  <SearchCard
                    type={"map"}
                    search={true}
                    owner={obj.owner}
                    name={obj.name}
                    _id={obj._id}
                  />
                ))
              ) : (
                <div>No Map Search Results</div>
              )}
            </div>
          </div>
          <div className="absolute text-white top-10 mt-48 mr-10 right-4">
            <div className="text-3xl font-bold text-center">Tags</div>
            <div className="bg-maptile-background-mid w-full mt-5 h-[30rem] overflow-auto rounded-xl ">
              <input
                onBlur={() => handleAddTag()}
                ref={tagRef}
                className=" bg-maptile-background-light mt-5 w-3/4 flex ml-7 rounded-xl p-2"
              ></input>
              <div className="flex flex-col ml-7 mt-5 space-y-4">
                {tags.map((obj, index) => (
                  <div>
                    <input
                      name="tagBox"
                      id="default-checkbox"
                      type="checkbox"
                      value={obj}
                      className="w-4 h-4 text-green-100 bg-black rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-checkbox"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {obj}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default SearchScreen;
