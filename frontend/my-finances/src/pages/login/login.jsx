import React, { useState } from "react"

import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faSmile, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import { useHistory } from 'react-router-dom'

import imgLog from '../../assets/log.svg'
import imgReg from '../../assets/register.svg'

import './login.css'

function Login(props) {
    const history = useHistory();
    const [container,setContainer] = useState("container");

    const [loadTitle,setLoadTitle] = useState("");
    const [loadMsg,setLoadMsg] = useState("");
    const [logBtn,setLogBtn] = useState(false);
    const [regBtn,setRegBtn] = useState(false);

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const signin = async () => {
        setLogBtn(false);
        setRegBtn(false);
        setContainer("container loading-mode")
        setLoadTitle("Connecting...")
        setLoadMsg("wait a moment while we try to connect to your account")
        await axios.post('http://localhost:8080/api/users/auth', {
            email: email,
            password: password
        }).then(res=> {
            history.push("/dashboard/"+res.data.id);
        }).catch(err=> {
            setLoadTitle("Something went wrong!")
            setLoadMsg(err.response.data)
            setLogBtn(true);
        })
    }

    const signup = async () => {
        setLogBtn(false);
        setRegBtn(false);
        setContainer("container creating-mode")
        setLoadTitle("Creating...")
        setLoadMsg("wait a moment while we create your account")
        await axios.post('http://localhost:8080/api/users', {
            name: name,
            email: email,
            password: password
        }).then(res=> {
            setLoadTitle("Welcome!")
            setLoadMsg("your account has been created with success")
            setLogBtn(true);
        }).catch(err=> {
            setLoadTitle("Something went wrong!")
            setLoadMsg(err.response.data)
            setRegBtn(true);
        })
    }
    
    return (
        <div className={container}>
            <div className="forms-container">
                <div className="signin-signup">
                    <form className="signin-form">
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
                        <input value="Enter" className="btn solid" onClick={signin}></input>
                    </form>

                    <form className="signup-form">
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
                        <input value="Sign up" className="btn solid" onClick={signup}></input>
                    </form>
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
                <div className="content">
                    <h3>{loadTitle}</h3>
                    <p>{loadMsg}</p>
                    {logBtn? <button className="btn transparent" onClick={() => setContainer("container")}>Return</button> : null}
                    {regBtn? <button className="btn transparent" onClick={() => setContainer("container sign-up-mode")}>Return</button> : null}
                </div>
            </div>
        </div>
    );
}

export default Login