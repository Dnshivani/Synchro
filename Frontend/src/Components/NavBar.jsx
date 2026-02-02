import React from 'react'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'
import Signup from './Signup'
import { Link } from 'react-router-dom'

export default function NavBar() {

    return (

        <div >
            <div className="navbar bg-base-100 shadow-sm bg-custom-secondary">
                <div className="navbar-start">

                    <Logo />
                </div>
                <div className="navbar-end ">
                    <Link to="/signup">
                        <p className="btn btn-outline  text-custom-primary" >Get Started</p>
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    )
}
//i want this nav bar to be able to use in landing page as will as dashboard
//map method try
