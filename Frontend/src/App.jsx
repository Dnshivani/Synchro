import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './Components/Landing/Landing.jsx'
import NavBar from './Components/NavBar.jsx'
import Signup from './Components/Signup.jsx'
import DashBoard from './Components/DashBoard/DashBoard.jsx'
import Notifications from './Components/DashBoard/Notifications.jsx'
import Profile from './Components/DashBoard/Profile.jsx'
import Home from './Components/DashBoard/Home.jsx'
import DiscoverWorkspace from "./Components/DashBoard/DiscoverWorkspace.jsx"
function App() {

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashBoard />} >
          <Route path="home" element={<Home />} />

          <Route path="discoverworkspace" element={<DiscoverWorkspace />} />

          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
