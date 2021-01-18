import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import './Input.css'

export default function Input(props) {
    return (
        <div className="input">
            <input id="input" onChange={e => props.setValue(e.target.value)} value={props.value}  {...props}></input>
            {props.value === "" ? null : <button className="btn-clean" onClick={() => props.setValue("")}><FontAwesomeIcon icon={faTimes} /></button>}
        </div>
    )
}