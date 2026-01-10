import React from 'react'
import ThemeToggle from './ThemeToggle'

export default function NavBar() {
    return (
        <div >
            <div className="navbar bg-base-100 shadow-sm bg-custom-secondary">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl  text-custom-primary">Synchro</a>
                </div>

                <div className="navbar-end">
                    <a className="btn text-custom-primary ">Get Started</a>
                </div>
            </div>
        </div>
    )
}
