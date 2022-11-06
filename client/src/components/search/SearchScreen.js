import Sidebar from "../sidebar/Sidebar";
import React, { useState, useEffect } from "react";
import TSSCard from "../card/TSSCard";
import Axios from "axios";
const SearchScreen = (props) => {
  const [userSelected, updateUserSelected] = useState(true)
  var [searchResults, setSearchResults] = useState([])
  let tab_selected = 'bg-maptile-background-mid text-center rounded-t-xl cursor-pointer  mt-[10px] duration-300'
  let tab_unselected = 'bg-maptile-tab-unselected text-center rounded-t-xl cursor-pointer duration-300'


  useEffect(() => {
    const tilesetRes = async () => {
      var response = await Axios.get(
        "https://maptile1.herokuapp.com/tileset")
      setSearchResults(response.data)
    }

    tilesetRes();
  }, []);


  const tags = ["Fire", "Water", "Awesome", "Big", "Small", "Great", "Earth", "City", "Lava", "Madison", "Castle", "Larger"]
  return (
    <div>
      <Sidebar setTheUser={props.setTheUser} />
      <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-top bg-maptile-background-dark text-white">
        <div className="pt-5 text-center text-4xl font-bold text-white">Search</div>
        <div className="flex flex-col h-[53rem] w-5/6 items-left justify-top ml-20 mt-10">
          <div class="grid grid-cols-4">
            <form className="mb-10 col-start-4 col-span-3">
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
              <div className="relative w-100">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-maptile-background-mid rounded-lg border border-gray-300 focus:ring-white-500 focus:border-black-500 dark:bg-maptile-background-mid dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Tilesets and Maps" required />
                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-maptile-background-mid hover:bg-black focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-maptile-green dark:hover:bg-maptile-green-highlight dark:focus:ring-blue-800">Search</button>
              </div>
            </form>
          </div>
          <div className="grid grid-cols-8 grid-rows-1 place-items-left w-full">

            <div className={`${userSelected ? tab_selected : tab_unselected}`} onClick={() => updateUserSelected(true)}>Tilesets</div>
            <div className={`${!userSelected ? tab_selected : tab_unselected}`} onClick={() => updateUserSelected(false)}>Maps</div>
          </div>
          <div className="bg-maptile-background-mid w-10/12 h-[50rem] rounded-r-xl rounded-b-xl overflow-auto">
            <div className="flex flex-row flex-wrap justify-center mr-8 py-10 pl-10 ">
              {searchResults.map((obj, index) =>
                <TSSCard search={true} name={obj.name} />
              )}
            </div>
            <div className="absolute text-white top-10 mt-48 mr-10 right-4">
              <div className="text-3xl font-bold text-center"> Tags</div>
              <div className="bg-maptile-background-mid w-full mt-5 h-[30rem] overflow-auto rounded-xl ">
                <input className=" bg-maptile-background-light mt-5 w-3/4 flex ml-7 rounded-xl p-2"></input>
                <div className="flex flex-col ml-7 mt-5 space-y-4">
                  {tags.map((obj, index) =>
                    <div>
                      <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-green-100 bg-black rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{obj}</label>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

      </main >
    </div >
  );
};

export default SearchScreen;
