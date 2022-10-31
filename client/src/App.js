import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homescreen from './components/homescreen/Homescreen';
import Home from './components/home/Home';
import TilesetScreen from './components/tileset/TilesetScreen';
import MapScreen from './components/map/MapScreen';
import SearchScreen from './components/search/SearchScreen';
import ProfileScreen from './components/profile/ProfileScreen';
import TilesetDisplay from './components/display/TilesetDisplay';
import MapDisplay from './components/display/MapDisplay';
import EditTileset from './components/tileset/EditTileset';
import EditMap from './components/map/EditMap';

function App() {

  let user = null

  return (
    <BrowserRouter>
      <div className='app-container'>
        <Routes>
          <Route exact index path="/" element={<Homescreen user={user} />} />
          <Route path="/home" element={<Home user={user} />} />
          <Route path="/user_tilesets" element={<TilesetScreen user={user} />} />
          <Route path="/user_maps" element={<MapScreen user={user} />} />
          <Route path="/search" element={<SearchScreen user={user} />} />
          <Route path="/user_profile" element={<ProfileScreen user={user} />} />
          <Route path="/tilesetdisplay" element={<TilesetDisplay user={user} />} />
          <Route path="/mapdisplay" element={<MapDisplay user={user} />} />
          <Route path="/tileset_edit" element={<EditTileset user={user}/>}/>
          <Route path="/map_edit" element={<EditMap user={user}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;