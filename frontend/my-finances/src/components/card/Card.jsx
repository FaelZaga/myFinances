import React from 'react'

import { months } from '../../components/selectMenu/SelectMenuData'

import './Card.css'

export default function Card(props) {
    return (
        <div className="card" onClick={props.onClick}>
            <div className="card-column header">
                {props.type === "EXPENSES" ? <div className="action expenses"><span>{props.type}</span></div>
                : <div className="action income"><span>{props.type}</span></div>}
            </div>
            <div className="card-column details">
                <div className="detail-group">
                    <div className="detail description">
                        <input type="text" disabled value={props.description}/>
                        <span>Description</span>
                    </div>
                </div>
                <div className="detail-group">
                    <div className="detail month">
                        {months.map((month,i) => {
                            return (month.value === props.month ? <input key={i} type="text" disabled value={month.label}/> : null)
                        })}
                        <span>Month</span>
                    </div>
                    <div className="detail year">
                        <input type="number" disabled value={props.year}/>
                        <span>Year</span>
                    </div>
                </div>
                <div className="detail-group">
                    <div className="detail status">
                        <input type="text" disabled value={props.status}/>
                        <span>Status</span>
                    </div>
                    <div className="detail value">
                        <input type="number" disabled value={props.value}/>
                        <span>Value</span>
                    </div>
                </div>
            </div>
        </div>
    )
}