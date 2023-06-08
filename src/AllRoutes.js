import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from './App'
import Login from './Component/Login'
import Signup from './Component/Signup'
import Typing from './Component/Typing'
import Home from './Component/Home'

function AllRoutes() {
  return (
    <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/typing" element={<Typing />}/>
        </Routes>
  )
}

export default AllRoutes