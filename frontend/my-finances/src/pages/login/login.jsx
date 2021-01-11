import React, { useState } from "react";

import './login.css'

import imgLog from '../../assets/log.svg'
import imgRegister from '../../assets/register.svg'

export default function Login() {
    const [container,setContainer] = useState("container");
    
    return (
        <div className={container}>
            <div className="forms-container">
                <div className="signin-signup">
                    <form className="signin-form">
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Enter email"></input>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="password" placeholder="Enter password"></input>
                        </div>
                        <input type="submit" value="Login" className="btn solid"></input>
                    </form>

                    <form className="signup-form">
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Enter name"></input>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="text" placeholder="Enter email"></input>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="password" placeholder="Enter password"></input>
                        </div>
                        <input type="submit" value="Sign up" className="btn solid"></input>
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here?</h3>
                        <p>Texto de teste escrito aqui sem nenhum sentido aparentemente</p>
                        <button className="btn transparent" onClick={() => setContainer("container sign-up-mode")}>Sign up</button>
                    </div>
                    <img src={imgLog} className="image" alt=""/>
                </div>

                <div className="panel right-panel">
                    <div className="content">
                        <h3>Already have an account?</h3>
                        <p>Texto de teste escrito aqui sem nenhum sentido aparentemente</p>
                        <button className="btn transparent" onClick={() => setContainer("container")}>Sign in</button>
                    </div>
                    <img src={imgRegister} className="image" alt=""/>
                </div>
            </div>
        </div>
    );
}