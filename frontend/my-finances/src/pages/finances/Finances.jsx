import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getFinances, changeVisible } from './financesActions'
import { getPayment, reset } from '../../components/card/cardActions'

import SelectMenu from '../../components/selectMenu/select'
import Input from '../../components/input/input'
import Card from '../../components/card/Card'
import CardHidden from '../../components/card/CardHidden'
import { monthsList, typesList, statusList } from '../../components/selectMenu/SelectMenuData'

import './finances.css'

function Finances(props) {
    const finances = props.list
    const visible = props.visible
    const [newMode,setNewMode] = useState(false)

    const [descriptionSearch, setDescriptionSearch] = useState("")
    const [yearSearch, setYearSearch] = useState("")
    const [typeSearch, setTypeSearch] = useState("")
    const [statusSearch, setStatusSearch] = useState("")
    const [monthSearch, setMonthSearch] = useState("")

    useEffect(() => {
        loadFinances()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.list])

    const loadFinances = () => {
        props.getFinances({
            "description": descriptionSearch,
            "type": typeSearch,
            "status": statusSearch,
            "month": monthSearch,
            "year": yearSearch,
            "user": 11
        })
    }

    const changeVisible = () => {
        props.changeVisible()
        if (visible === true && newMode === true) {
            setNewMode(false)
        }
    }

    const handleNew = () => {
        props.reset()
        if (!visible) {
            changeVisible()
        }
        setNewMode(true)
    }

    const handleLoad = (id) => {
        if (!visible) {
            changeVisible()
        }
        setNewMode(false)
        props.getPayment(id)
    }

    return (
        <div className="container-body">
            <div className="search-panel">
                <div className="search-panel-group">
                    <div className="panel-group button">
                        {newMode ? <button className="button-span" onClick={changeVisible}><span>Close</span></button>
                        : <button className="button-span" onClick={handleNew}><span>New</span></button>}
                    </div>
                </div>
                <div className="search-panel-group">
                    <div className="panel-group description">
                        <Input className="input-field first"
                            type="text"
                            placeholder="Description"
                            autoComplete="off"
                            value={descriptionSearch}
                            onChange={e => setDescriptionSearch(e.target.value)}
                            onClick={() => setDescriptionSearch("")}
                        ></Input>
                    </div>
                    <div className="panel-group select">
                        <SelectMenu className="select-field type"
                            options={typesList}
                            value={typeSearch}
                            onChange={e => setTypeSearch(e.target.value)}
                            onClick={() => setTypeSearch("")}
                        ></SelectMenu>
                        <SelectMenu className="select-field status"
                            options={statusList}
                            value={statusSearch}
                            onChange={e => setStatusSearch(e.target.value)}
                            onClick={() => setStatusSearch("")}
                        ></SelectMenu>
                        <SelectMenu className="select-field month"
                            options={monthsList}
                            value={monthSearch}
                            onChange={e => setMonthSearch(e.target.value)}
                            onClick={() => setMonthSearch("")}
                        ></SelectMenu>
                    </div>
                    <div className="panel-group year">
                        <Input className="input-field last"
                            type="number"
                            placeholder="Year"
                            autoComplete="off"
                            value={yearSearch}
                            onChange={e => setYearSearch(e.target.value)}
                            onClick={() => setYearSearch("")}
                        ></Input>
                    </div>
                    <div className="panel-group button">
                        <button className="button-span" onClick={loadFinances}><span>Search</span></button>
                    </div>
                </div>
            </div>

            <div className="finances-panel">
                <div className={visible ? "create-panel active" : "create-panel"}>
                    <CardHidden new={newMode} cancel={changeVisible}
                    ></CardHidden>
                </div>
                <div className={visible ? "edit-panel active" : "edit-panel"}>
                    {finances.map((payment,i) => {
                        return (
                            <Card key={i} onClick={() => handleLoad(payment.id)}
                                type={payment.type}
                                status={payment.status}
                                month={payment.month}
                                year={payment.year}
                                description={payment.description}
                                value={payment.value}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        list: state.finances.list,
        visible: state.finances.visible
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({getFinances, getPayment, changeVisible, reset},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Finances)