import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/Home';
import { useNavigate } from 'react-router-dom';


function App() {

  console.log(import.meta.env.VITE_API)

  return (
    <div className="App font-nuito ">
      <Toaster />
      <Home />
    </div>
  );
}

export default App;
