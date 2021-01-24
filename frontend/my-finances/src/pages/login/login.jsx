import React, { useState } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { signin, signup } from '../../store/actions/userActions'
import { setWarning } from '../../store/actions/warningActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faSmile, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import Warning from '../../components/warning/warning'

import imgLog from '../../assets/log.svg'
import imgReg from '../../assets/register.svg'

import './login.css'

function Login(props) {
    const [container,setContainer] = useState("container");
    const signUp = props.signUp

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const signin = async () => {
        setContainer("container loading-mode")
        props.setWarning({ title: "Connecting...", msg: "wait a moment while we try to connect to your account"})
        props.signin({ "email": email, "password": password })
    }

    const signup = async () => {
        setContainer("container creating-mode")
        props.setWarning({ title: "Creating...", msg: "wait a moment while we create your account"})
        props.signup({ "name": name, "email": email, "password": password })
    }
    
    return (
        <div className="auth">
            <div className={container}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <div className="signin-form">
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">                                              
                                <i><FontAwesomeIcon icon={faUser} /></i>
                                <input type="email" 
                                    placeholder="Enter email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            <div className="input-field">
                                <i><FontAwesomeIcon icon={faLock} /></i>
                                <input type="password" 
                                    placeholder="Enter password"
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>
                            <button className="btn solid" onClick={signin}><span>Sign in</span></button>
                        </div>

                        <div className="signup-form">
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i><FontAwesomeIcon icon={faSmile} /></i>
                                <input type="text"
                                    placeholder="Enter name"
                                    autoCapitalize="words"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </div>
                            <div className="input-field">
                                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                                <input type="email"
                                    placeholder="Enter email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            <div className="input-field">
                                <i><FontAwesomeIcon icon={faLock} /></i>
                                <input type="password"
                                    placeholder="Enter password"
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>
                            <button className="btn solid" onClick={signup}><span>Sign up</span></button>
                        </div>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>Are you new here?</h3>
                            <p>Create your account and start managing your finances quickly and easily!</p>
                            <button className="btn transparent" onClick={() => setContainer("container sign-up-mode")}>Sign up</button>
                        </div>
                        <img src={imgLog} className="image" alt=""/>
                    </div>

                    <div className="panel right-panel">
                        <div className="content">
                            <h3>Already have an account?</h3>
                            <p>Log in to your account and manage your finances right now!</p>
                            <button className="btn transparent" onClick={() => setContainer("container")}>Sign in</button>
                        </div>
                        <img src={imgReg} className="image" alt=""/>
                    </div>
                </div>

                <div className="panel loading-creating">
                    <Warning onClick={signUp ? () => setContainer("container sign-up-mode")
                        : () => setContainer("container")} />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({ signUp: state.warning.signUp})
const mapDispatchToProps = dispatch => bindActionCreators({ signin, signup, setWarning },dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Login)