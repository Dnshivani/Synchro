import React from 'react'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'
import Signup from './Signup'
import { Navigate, Link } from 'react-router-dom'

export default function NavBar() {
    const getStarted = () => {


    }
    return (
        <div >
            <div className="navbar bg-base-100 shadow-sm bg-custom-secondary">
                <div className="navbar-start">
                    <Logo />
                </div>
                <div className="navbar-end ">
                    <a className="btn  text-custom-primary" onClick={getStarted} >Get Started</a>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    )
}
