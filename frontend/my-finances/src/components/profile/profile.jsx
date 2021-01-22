import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout } from '../../store/actions/authActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import './profile.css'

function Profile(props) {
    const { name, email } = props.user
    const [info,setInfo] = useState(false)
    const [userName,setUserName] = useState(name)
    const [userEmail,setUserEmail] = useState(email)

    const showInfo = () => {
        setInfo(!info)
        setUserName(name)
        setUserEmail(email)
    }

    return (
        <div className={props.open ? "profile-dropdown active" : "profile-dropdown"}>
            <div className="dropdown-content">
                <div className="dropdown-header">
                    <i><FontAwesomeIcon icon={faUser} /></i>
                    <p>{name}</p><small>{email}</small>
                </div>
                <div className={info ? "dropdown-body active" : "dropdown-body"}>
                    <div className="user-info">
                        <input type="text" value={userName} onChange={e => setUserName(e.target.value)}/>
                        <span>Name</span>
                        <input type="text" value={userEmail} onChange={e => setUserEmail(e.target.value)}/>
                        <span>Email</span>
                    </div>
                </div>
                <div className="dropdown-footer">
                    <button className="profile-btn" onClick={showInfo}>
                        {info ? <span>Hide</span> : <span>Profile</span>}
                    </button>
                    {info ? <button className="profile-btn" onClick={props.logout}><span>Save</span></button>
                    : <button className="profile-btn" onClick={props.logout}><span>Sign out</span></button>}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({ logout },dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Profile)