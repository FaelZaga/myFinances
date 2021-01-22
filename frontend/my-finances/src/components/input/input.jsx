import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import './input.css'

export default function Input(props) {
    return (
        <div className="input-content">
            <input className={props.className} onChange={props.onChange} value={props.value} placeholder={props.placeholder}></input>
            {props.value === "" ? null : <button className="btn-clean" onClick={props.onClick}><FontAwesomeIcon icon={faTimes} /></button>}
        </div>
    )
}