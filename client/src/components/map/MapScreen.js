import Sidebar from "../sidebar/Sidebar";
import React, { useState } from "react";

const MapScreen = (props) => {
  let [userSelected, updateUserSelected] = useState(true)
  let tab_selected = 'bg-maptile-background-mid text-center rounded-t-xl cursor-pointer'
  let tab_unselected = 'bg-maptile-tab-unselected text-center rounded-t-xl cursor-pointer'
  
  return( 
    <div>
      <Sidebar/>
      
      <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-top bg-maptile-background-dark text-white">
        <div className="pt-5 text-center text-4xl font-bold text-white">Maps</div>
        <div className="flex flex-col h-[55rem] w-5/6 items-left justify-top ml-20 mt-16">
          <div className="grid grid-cols-2 grid-rows-1 place-items-left w-1/5">
            <div className={`${userSelected ? tab_selected : tab_unselected}`} onClick={() => updateUserSelected(true)}>User Maps</div>
            <div className={`${!userSelected ? tab_selected : tab_unselected}`} onClick={() => updateUserSelected(false)}>Shared Maps</div>
          </div>
          <div className="bg-maptile-background-mid w-full h-[50rem] rounded-r-xl rounded-b-xl">

          </div>
        </div>
      </main>
    </div>
  );
};

export default MapScreen;
