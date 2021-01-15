import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import './SelectMenu.css'

export default function SelectMenu(props) {
    const [value, setValue] = useState("");

    const options = props.options.map(option => {
        return (
            option.value === "" ? <option value={option.value} hidden>{option.label}</option> :
            <option value={option.value}>{option.label}</option>
        )
    })

    return (
        <div className="select-menu">
            <select id="select" onChange={e => setValue(e.target.value)} value={value} {...props}>
                {options}
            </select>
            {value === "" || props.noBtn ? null : <button className="btn-clean" onClick={() => setValue("")}><FontAwesomeIcon icon={faTimes} /></button>}
        </div>
    )
}