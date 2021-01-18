import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import './SelectMenu.css'

export default function SelectMenu(props) {
    const options = props.options.map((option,i) => {
        return (
            <option key={i} value={option.value}>{option.label}</option>
        )
    })

    return (
        <div className="select-menu">
            <select id="select" onChange={e => props.setValue(e.target.value)} value={props.value} {...props}>
                {options}
            </select>
            {props.value === "" ? null : <button className="btn-clean" onClick={() => props.setValue("")}><FontAwesomeIcon icon={faTimes} /></button>}
        </div>
    )
}