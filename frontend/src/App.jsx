import React from 'react'
import './App.css';
import Login from './components/login/Login'
import Registration from './components/registration/Registration';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Forgot from './components/forgotPass/Forgot_pass';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Registration/>}/>
      <Route path='/forgot_pass' element={<Forgot/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App