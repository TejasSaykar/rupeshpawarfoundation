import React from 'react'
import './App.css'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/Login'
import Home from './pages/Home'
import Idcard from './pages/Idcard'
import GenerateId from './pages/GenerateId'

function App() {

  return (
    <>
      {/* <h1 className='text-center'>Spitertech Registration</h1> */ }
      <div style={{display: window.print === true ? "none" : "block"}}>
        <Navbar />
      </div>
      <Routes>
        <Route path='/' element={ <IsLogin><Home /></IsLogin> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path="/idcard" element={ <Idcard /> } />
        <Route path='/generateid' element={ <GenerateId /> } />
      </Routes>

    </>
  )
}
export const IsLogin = (props) => {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to={ "/login" } />
  }
}

export default App
