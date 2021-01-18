import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChartLine, faPiggyBank, faUserAlt, faSadTear } from '@fortawesome/free-solid-svg-icons'

import { Link, useParams } from 'react-router-dom';

import './Navbar.css'

export default function Navbar() {  
    const {useId} = useParams();
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <div className="navbar">
                <button className="navbar-toggle" onClick={showSidebar}><FontAwesomeIcon icon={faBars}/></button>
                <h1>yFinances</h1>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    <li className="nav-item" onClick={showSidebar}>
                        <Link className="btn-item" to={"/dashboard/"+useId}>
                            <i><FontAwesomeIcon icon={faChartLine}/></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item" onClick={showSidebar}>
                        <Link className="btn-item" to={"/finances/"+useId}>
                            <i><FontAwesomeIcon icon={faPiggyBank}/></i>
                            <span>Finances</span>
                        </Link>
                    </li>
                    <li className="nav-item" onClick={showSidebar}>
                        <Link className="btn-item" to="/profile">
                            <i><FontAwesomeIcon icon={faUserAlt}/></i>
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li className="nav-item" onClick={showSidebar}>
                        <Link className="btn-item" to="/login">
                            <i><FontAwesomeIcon icon={faSadTear}/></i>
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}