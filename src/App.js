
import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Masjidform from './pages/Masjidform';
import Topbar from './components/Topbar';
import { BrowserRouter } from 'react-router-dom';
import Masjidlist from './pages/Masjidlist';
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/alldata')
        .then((res)=>{
            console.log(res);
            localStorage.setItem('Referencedata',JSON.stringify(res.data.countries))
            localStorage.setItem('statedata',JSON.stringify(res.data.states))
            
        })
    },[])
    
    
  return (
    <>
    <BrowserRouter>
      <Topbar/>
    <Routes>
      <Route path='register' element={<Masjidform/>}></Route>
      <Route path='/' element={<Masjidlist/>}></Route>
      <Route path='*' element={<h1>Page Not Found</h1>}></Route>
    </Routes>
    </BrowserRouter>
    </>
   
  );
}

export default App;
