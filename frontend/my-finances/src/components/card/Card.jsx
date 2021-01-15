import React, {useState} from 'react'

import Select from '../selectMenu/SelectMenu'
import { months, status } from '../../components/selectMenu/SelectMenuData'

import './Card.css'

export default function Card(props) {
    const [disabled,setDisabled] = useState(props.disabled);

    const setEdit = () => {
        setDisabled(!disabled);
    }

    return (
        <div className="card">
            <div className="card-column">
                <div className="action status"><span>Income</span></div>
            </div>
            <div className="card-column details">
                <div className="detail-group">
                    <div className="detail">
                        <Select options={status} noBtn={true} disabled={disabled}></Select>
                        <span>Status</span>
                    </div>
                    <div className="detail">
                        <Select options={months} noBtn={true} disabled={disabled}></Select>
                        <span>Month</span>
                    </div>
                    <div className="detail">
                        <input type="number" value="2021" disabled={disabled}></input>
                        <span>Year</span>
                    </div>
                </div>
                <div className="detail-group">
                    <div className="detail">
                        <input type="text" value="Pagamento de salário" disabled={disabled}></input>
                        <span>Description</span>
                    </div>
                    <div className="detail value">
                        <input type="number" min="0.01" step="0.01" value={100.50} disabled={disabled}></input>
                        <span>Value</span>
                    </div>
                </div>
            </div>
            <div className="card-column">
                <button className="action edit" onClick={setEdit} hidden={!disabled}>Edit</button>
                <button className="action delete" hidden={!disabled}>Delete</button>
                <button className="action save" onClick={setEdit} hidden={disabled}>Save</button>
                <button className="action cancel" hidden={disabled}>Cancel</button>
            </div>
        </div>
    )
}