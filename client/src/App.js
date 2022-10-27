import './App.css';
import React 			from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Homescreen from './components/homescreen/Homescreen';

function App() {

  let user = null

  return (
    <BrowserRouter>
      <div className='app-container'>
        <Routes>
          <Route index element={<Homescreen user={user}/>}/>
        </Routes>
      </div>
		</BrowserRouter>
  );
}
export default App;