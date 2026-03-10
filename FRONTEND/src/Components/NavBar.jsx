import React from 'react'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'
import Signup from './Signup'
import { Link } from 'react-router-dom'

export default function NavBar({ element = [], basepath = "" }) {//element=element same 
    const traverse = () => {
        return (
            (element.map(ele => <Link to={`${basepath}/${ele.e.toLowerCase()}`}><p className='hover:text-accent' key={ele.id} > {ele.e}</p ></Link>))

        )
    }
    return (
        <div >
            <div className="navbar bg-base-200 shadow-sm">
                <div className="navbar-start">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <div className='flex gap-4 text-primary-content'>{traverse()}</div>
                <div className="navbar-end ">
                    <Link to="/signup">
                        <p className="btn btn-outline  text-primary-content" >Get Started</p>
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    )
}
//i want this nav bar to be able to use in landing page as will as dashboard
//map method try
