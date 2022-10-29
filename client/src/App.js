import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homescreen from './components/homescreen/Homescreen';
import TilesetScreen from './components/tileset/TilesetScreen';
import MapScreen from './components/map/MapScreen';
import SearchScreen from './components/search/SearchScreen';
import ProfileScreen from './components/profile/ProfileScreen';
import TilesetDisplay from './components/display/TilesetDisplay';

function App() {

  let user = null

  return (
    <BrowserRouter>
      <div className='app-container'>
        <Routes>
          <Route exact index path="/" element={<Homescreen user={user} />} />
          <Route path="/user_tilesets" element={<TilesetScreen user={user} />} />
          <Route path="/user_maps" element={<MapScreen user={user} />} />
          <Route path="/search" element={<SearchScreen user={user} />} />
          <Route path="/user_profile" element={<ProfileScreen user={user} />} />
          <Route path="/tileset" element={<TilesetDisplay user={user} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;