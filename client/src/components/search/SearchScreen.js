import Sidebar from "../sidebar/Sidebar";
import React, { useState } from "react";
import TSSCard from "../card/TSSCard";
const SearchScreen = (props) => {
  const [userSelected, updateUserSelected] = useState(true)
  let tab_selected = 'bg-maptile-background-mid text-center rounded-t-xl cursor-pointer  mt-[10px] duration-300'
  let tab_unselected = 'bg-maptile-tab-unselected text-center rounded-t-xl cursor-pointer duration-300'
  const handleAddTag = (e) => {
    console.log(e.target.value)
  }
  const tilesets = []
  let tileset1 = { name: "Great Tileset" };
  let tileset2 = { name: "Best Tileset" };
  let tileset3 = { name: "Nice Tileset" }
  let tileset4 = { name: "Water Tileset" }
  let tileset5 = { name: "Grass Tileset" }
  let tileset6 = { name: "Lava Tileset" }
  let tileset7 = { name: "Small Tileset" }
  let tileset8 = { name: "Large Tileset" }

  tilesets.push(tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8)
  const tags = ["Fire", "Water", "Awesome", "Big", "Small", "Great", "Earth", "City", "Lava", "Madison", "Castle", "Larger"]
  return (
    <div>
      <Sidebar />
      <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-top bg-maptile-background-dark text-white">
        <div className="pt-5 text-center text-4xl font-bold text-white underline">Search</div>
        <div className="flex flex-col h-[53rem] w-5/6 items-left justify-top ml-20 mt-10">
          <div class="grid grid-cols-4">
            <form class="mb-10 col-start-4 col-span-3">
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
              <div class="relative w-100">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-white-500 focus:border-black-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Tilesets and Maps" required />
                <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-maptile-background-mid hover:bg-black focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
            </form>
          </div>
          <div className="grid grid-cols-8 grid-rows-1 place-items-left w-full">

            <div className={`${userSelected ? tab_selected : tab_unselected}`} onClick={() => updateUserSelected(true)}>Tilesets</div>
            <div className={`${!userSelected ? tab_selected : tab_unselected}`} onClick={() => updateUserSelected(false)}>Maps</div>
          </div>
          <div className="bg-maptile-background-mid w-10/12 h-[50rem] rounded-r-xl rounded-b-xl overflow-auto">
            <div className="flex flex-row flex-wrap justify-center mr-8 py-10 pl-10 ">
              {tilesets.map((obj, index) =>
                <TSSCard name={obj.name} />
              )}
            </div>
            <div class="absolute text-white top-10 mt-48 mr-10 right-4">
              <div class="text-3xl font-bold text-center"> Tags</div>
              <div class="bg-maptile-background-mid w-full mt-5 h-[30rem] overflow-auto ">
                <input onEnter={() => handleAddTag()} class=" bg-maptile-background-light mt-5 w-3/4 flex ml-7"></input>
                <div class="flex flex-col ml-7 mt-5 space-y-4">
                  {tags.map((obj, index) =>
                    <div>
                      <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-green-100 bg-black rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
