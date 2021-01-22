import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import './select.css'

export default function SelectMenu(props) {
    const options = props.options.map((option,i) => {
        return (
            <option key={i} value={option.value}>{option.label}</option>
        )
    })

    return (
        <div className="select-content">
            <select id="select" className={props.className} onChange={props.onChange} value={props.value}>
                {options}
            </select>
            {props.value !== "" ? <button className="btn-clean" onClick={props.onClick}><FontAwesomeIcon icon={faTimes} /></button> : null}
        </div>
    )
}