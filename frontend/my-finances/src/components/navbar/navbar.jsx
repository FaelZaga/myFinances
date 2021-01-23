import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faChartLine, faPiggyBank } from '@fortawesome/free-solid-svg-icons'

import Profile from '../profile/profile'

import { Link } from 'react-router-dom';

import './navbar.css'

function Navbar() {
    const [sidebar, setSidebar] = useState(false)
    const [profile, setProfile] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)
    const showProfile = () => setProfile(!profile)

    return (
        <>
            <div className="navbar">
                <div className="navbar-group">
                    <button className="navbar-toggle" onClick={showSidebar}><FontAwesomeIcon icon={faBars} /></button>
                    <h1>yFinances</h1>
                </div>
                <div className="navbar-group">
                    <button className="navbar-toggle" onClick={showProfile}><FontAwesomeIcon icon={faUser} /></button>
                </div>
            </div>
            <Profile open={profile} close={() => setProfile(false)}/>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"} onMouseLeave={() => setSidebar(false)}>
                <ul className="nav-menu-items">
                    <li className="nav-item">
                        <Link className="btn-item" to="/" onClick={() => setSidebar(false)}>
                            <i><FontAwesomeIcon icon={faChartLine}/></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="btn-item" to="/finances" onClick={() => setSidebar(false)}>
                            <i><FontAwesomeIcon icon={faPiggyBank}/></i>
                            <span>Finances</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar