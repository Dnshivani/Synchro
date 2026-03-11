import Navbar from 'daisyui/components/navbar'
import React from 'react'
import NavBar from '../NavBar.jsx'
import { Outlet } from 'react-router-dom';
const DashBoard = () => {
    const element = [{ "id": 1, "e": "Home" },
    { "id": 2, "e": "DiscoverWorkspace" },
    { "id": 3, "e": "Notifications" },
    { "id": 4, "e": "Profile" },];

    return (

        <div>
            {/* <p>DashBard</p> */}

            <NavBar element={element} basepath='/dashboard' />
            <Outlet />
        // home discover_workspace notifications profile


        </div>
    )
}

export default DashBoard
/*

/*
hero section :create workspcase button  a component for create tasks
list of all workspace if any thiing is clicked to to another folder called workspace 
there we have workspace componnt which have kananban ,profileall that
*/