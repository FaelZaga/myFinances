import React from 'react'

import { months, status, types } from '../selectMenu/SelectMenuData'

import './Card.css'

export default function CardHidden(props) {

    return (
        <div className="card">
            <div className="card-column header">
                {props.type ==="" ? <div className="action new"><span>NEW</span></div>
                : props.type === "EXPENSES" ? <div className="action expenses"><span>{props.type}</span></div>
                : <div className="action income"><span>{props.type}</span></div>}
            </div>
            <div className="card-column details">
                <div className="detail-group">
                    <div className="detail type">
                        <select value={props.type} onChange={e => props.setType(e.target.value)}>
                            {types.map((type,i) => {
                                return (
                                    <option key={i} value={type.value}>{type.label}</option>
                                )
                            })}
                        </select>
                        <span>Type</span>
                    </div>
                    <div className="detail description">
                        <input type="text" placeholder="Description" value={props.description} onChange={e => props.setDescription(e.target.value)}/>
                        <span>Description</span>
                    </div>
                </div>
                <div className="detail-group">
                    <div className="detail month">
                        <select value={props.month} onChange={e => props.setMonth(e.target.value)}>
                            {months.map((month,i) => {
                                return (
                                    <option key={i} value={month.value}>{month.label}</option>
                                )
                            })}
                        </select>
                        <span>Month</span>
                    </div>
                    <div className="detail year">
                        <input type="number" placeholder="Year" value={props.year} onChange={e => props.setYear(e.target.value)}/>
                        <span>Year</span>
                    </div>
                </div>
                <div className="detail-group">
                    <div className="detail status">
                        <select value={props.status} onChange={e => props.setStatus(e.target.value)}>
                            {status.map((stat,i) => {
                                return (
                                    <option key={i} value={stat.value}>{stat.label}</option>
                                )
                            })}
                        </select>
                        <span>Status</span>
                    </div>
                    <div className="detail value">
                        <input type="number" placeholder="Value" value={props.value} onChange={e => props.setValue(e.target.value)}/>
                        <span>Value</span>
                    </div>
                </div>
            </div>
            <div className="card-column footer">
                <button className="action cancel"><span>Cancel</span></button>
                <button className="action save"><span>Save</span></button>
            </div>
        </div>
    )
}