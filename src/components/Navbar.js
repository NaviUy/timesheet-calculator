import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <div className='nav-container'>
            <div className="nav-logo"><h1>Timesheet Calculator</h1></div>
            <ul>
                <li><NavLink className={isActive => isActive.isActive ? "active" : "inactive"} to="/">Home</NavLink></li>
                <li><NavLink className={isActive => isActive.isActive ? "active" : "inactive"} to="/profile">Profile</NavLink></li>
                <li><NavLink className={isActive => isActive.isActive ? "active" : "inactive"} to="/pdf">GeneratePDF</NavLink></li>
            </ul>
        </div>
    )
}

export default Navbar
