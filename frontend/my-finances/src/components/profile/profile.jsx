import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { update, logout } from '../../store/actions/userActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import './profile.css'

function Profile(props) {
    const { id, name, email } = props.user
    const [info,setInfo] = useState(false)
    const [userName,setUserName] = useState("")
    const [userEmail,setUserEmail] = useState("")
    const [oldPassword,setOldPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")

    useEffect(() => {
        clear()
    }, [props.user])

    const showInfo = () => {
        setInfo(!info)
    }

    const update = () => {
        props.update(id,{
            name: userName,
            email: userEmail,
            password: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        })
    }

    const clear = () => {
        setUserName("")
        setUserEmail("")
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
    }

    return (
        <div className={props.open ? "profile-dropdown active" : "profile-dropdown"}>
            <div className="dropdown-content">
                <div className="dropdown-header">
                    <i><FontAwesomeIcon icon={faUser} /></i>
                    <p>{name}</p><small>{email}</small>
                </div>
                {console.log(props.error)}
                <div className={info ? "dropdown-body active" : "dropdown-body"}>
                    <div className="user-info">
                        <input type="text" autoCapitalize="Words" placeholder={name} value={userName} onChange={e => setUserName(e.target.value)}/>
                        <span>Name</span>
                        <input type="text" placeholder={email} value={userEmail} onChange={e => setUserEmail(e.target.value)}/>
                        <span>Email</span>
                        <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)}/>
                        <span>Password</span>
                        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
                        <span>New password</span>
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                        <span>Confirm password</span>
                    </div>
                </div>
                <div className="dropdown-footer">
                    <button className="profile-btn" onClick={showInfo}>
                        {info ? <span>Hide</span> : <span>Profile</span>}
                    </button>
                    {info ? <button className="profile-btn" onClick={update}><span>Update</span></button>
                    : <button className="profile-btn" onClick={props.logout}><span>Sign out</span></button>}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ user: state.user.user })
const mapDispatchToProps = dispatch => bindActionCreators({ update, logout },dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Profile)