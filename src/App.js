
import './App.css';
import React from 'react'
import { Routes, Route, Navigate} from "react-router-dom";
import Home from './Pages/home';
import List from './Pages/list';


function App() {
  
  return (

          <div>
                <Routes>
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route path="/" element={<Home/>}/>
                    <Route path="/List" element={<List/>}/>
                </Routes>
            </div>
  )
}

export default App;
