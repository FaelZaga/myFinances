import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import './Input.css'

export default function Input(props) {
    const [value, setValue] = useState("");

    return (
        <div className="input">
            <input id="input" {...props} onChange={e => setValue(e.target.value)} value={value}></input>
            {value === "" ? null : <button className="btn-clean" onClick={() => setValue("")}><FontAwesomeIcon icon={faTimes} /></button>}
        </div>
    )
}