import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getPayment, createPayment, updatePayment, deletePayment } from './cardActions'

import { monthsList, statusList, typesList } from '../selectMenu/SelectMenuData'

import './Card.css'

function CardHidden(props) {
    const {id, description, type, status, month, year, value} = props.payment

    const [descriptionInput, setDescription] = useState("")
    const [typeSelect, setType] = useState("")
    const [statusSelect, setStatus] = useState("")
    const [monthSelect, setMonth] = useState("")
    const [yearInput, setYear] = useState("")
    const [valueInput, setValue] = useState("")

    useEffect(() => {
        fillField()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.payment])

    const create = () => {
        createPayment({
            "description": descriptionInput,
            "month": monthSelect,
            "year": yearInput,
            "value": valueInput,
            "type": typeSelect,
            "status": statusSelect,
            "user": {
                "id": 11
            }
        })
    }

    const edit = () => {
        updatePayment({
            "id":id,
            "description": descriptionInput,
            "month": monthSelect,
            "year": yearInput,
            "value": valueInput,
            "type": typeSelect,
            "status": statusSelect,
            "user": {
                "id": 11
            }
        })
    }

    const remove = () => {
        deletePayment(id)
    }

    const fillField = () => {
        setDescription(description)
        setType(type)
        setStatus(status)
        setMonth(month)
        setYear(year)
        setValue(value)
    }

    return (
        <div className="card">
            <div className="card-column header">
                {type === undefined ? <div className="action new"><span>NEW</span></div>
                : type === "EXPENSES" ? <div className="action expenses"><span>{type}</span></div>
                : <div className="action income"><span>{type}</span></div>}
            </div>
            <div className="card-column details">
                <div className="detail-group">
                    <div className="detail type">
                        <select value={typeSelect || ""} onChange={e => setType(e.target.value)}>
                            {typesList.map((type,i) => {
                                return (
                                    <option key={i} value={type.value}>{type.label}</option>
                                )
                            })}
                        </select>
                        <span>Type</span>
                    </div>
                    <div className="detail description">
                        <input type="text" placeholder="Description" value={descriptionInput || ""} onChange={e => setDescription(e.target.value)}/>
                        <span>Description</span>
                    </div>
                </div>
                <div className="detail-group">
                    <div className="detail month">
                        <select value={monthSelect || ""} onChange={e => setMonth(e.target.value)}>
                            {monthsList.map((month,i) => {
                                return (
                                    <option key={i} value={month.value}>{month.label}</option>
                                )
                            })}
                        </select>
                        <span>Month</span>
                    </div>
                    <div className="detail year">
                        <input type="number" placeholder="Year" value={yearInput || ""} onChange={e => setYear(e.target.value)}/>
                        <span>Year</span>
                    </div>
                </div>
                <div className="detail-group">
                    <div className="detail status">
                        <select value={statusSelect || ""} onChange={e => setStatus(e.target.value)}>
                            {statusList.map((stat,i) => {
                                return (
                                    <option key={i} value={stat.value}>{stat.label}</option>
                                )
                            })}
                        </select>
                        <span>Status</span>
                    </div>
                    <div className="detail value">
                        <input type="number" placeholder="Value" value={valueInput || ""} onChange={e => setValue(e.target.value)}/>
                        <span>Value</span>
                    </div>
                </div>
            </div>
            <div className="card-column footer">
                <button className="action cancel" onClick={props.cancel}><span>Cancel</span></button>
                {props.new ? <button className="action create"  onClick={create}><span>Create</span></button>
                : <><button className="action delete"  onClick={remove}><span>Delete</span></button>
                 <button className="action edit"  onClick={edit}><span>Save</span></button></>}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({payment: state.cardHidden.payment})
const mapDispatchToProps = dispatch => bindActionCreators({
    getPayment,createPayment,updatePayment,deletePayment},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(CardHidden)