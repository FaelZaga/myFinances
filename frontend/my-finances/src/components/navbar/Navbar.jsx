import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout } from '../../auth/authActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChartLine, faPiggyBank, faUserAlt, faSadTear } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom';

import './Navbar.css'

function Navbar(props) {  
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <div className="navbar">
                <button className="navbar-toggle" onClick={showSidebar}><FontAwesomeIcon icon={faBars} /></button>
                <h1>yFinances</h1>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} onMouseLeave={showSidebar}>
                <ul className='nav-menu-items'>
                    <li className="nav-item" onClick={showSidebar}>
                        <Link className="btn-item" to="/dashboard">
                            <i><FontAwesomeIcon icon={faChartLine}/></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item" onClick={showSidebar}>
                        <Link className="btn-item" to="/finances">
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
                        <Link className="btn-item" onClick={props.logout} to="/">
                            <i><FontAwesomeIcon icon={faSadTear}/></i>
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({ logout },dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Navbar)