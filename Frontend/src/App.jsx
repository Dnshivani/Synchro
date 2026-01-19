import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './Components/Landing.jsx'
import NavBar from './Components/NavBar.jsx'
import Signup from './Components/Signup.jsx'
import DashBoard from './Components/DashBoard.jsx'
function App() {

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashBoard />} />

      </Routes>
    </>
  )
}

export default App
