import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout } from '../../auth/authActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faChartLine, faPiggyBank } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom';

import './navbar.css'

function Navbar(props) {
    const { name, email } = props.user
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
            <div className={profile ? "profile-dropdown active" : "profile-dropdown"}>
                <div className="dropdown-content">
                    <div className="dropdown-header">
                        <i><FontAwesomeIcon icon={faUser} /></i>
                        <p>{name}</p><small>{email}</small>
                    </div>
                    <div className="dropdown-footer">
                        <button className="profile-btn"><span>Profile</span></button>
                        <button className="profile-btn" onClick={props.logout}><span>Sign out</span></button>
                    </div>
                </div>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"} onMouseLeave={showSidebar}>
                <ul className="nav-menu-items">
                    <li className="nav-item">
                        <Link className="btn-item" to="/dashboard">
                            <i><FontAwesomeIcon icon={faChartLine}/></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="btn-item" to="/finances">
                            <i><FontAwesomeIcon icon={faPiggyBank}/></i>
                            <span>Finances</span>
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