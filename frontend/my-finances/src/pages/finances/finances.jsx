import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getFinances } from '../../store/actions/financesActions'
import { getPayment, changeVisible, changeMode, resetPayment } from '../../store/actions/paymentActions'

import SelectMenu from '../../components/select/select'
import Input from '../../components/input/input'
import Card from '../../components/card/card'
import CardEditor from '../../components/card/cardEditor'
import { monthsList, typesList, statusList } from '../../components/select/selectData'

import './finances.css'

function Finances(props) {
    const finances = props.list
    const visible = props.visible
    const createMode = props.createMode
    const { id } = props.user

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
            "user": id
        })
    }

    const handleLoad = (id) => {
        isOpen()
        isCreate()
        props.getPayment(id)
    }

    const handleCreate = () => {
        isOpen()
        props.resetPayment()
        props.changeMode()
    }

    const handleClose = () => {
        isCreate()
        props.changeVisible()
    }

    const isOpen = () => {
        if (!visible) { props.changeVisible() }
    }

    const isCreate = () => {
        if (createMode) { props.changeMode() }
    }

    return (
        <div className="container-body">
            <div className="search-panel">
                <div className="search-panel-group">
                    <div className="panel-group button">
                        {createMode ? <button className="button-span" onClick={handleClose}><span>Close</span></button>
                        : <button className="button-span" onClick={handleCreate}><span>New</span></button>}
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
                    <CardEditor mode={createMode} cancel={handleClose}/>
                </div>
                <div className={visible ? "edit-panel active" : "edit-panel"}>
                    {finances.reverse().map((payment,i) => {
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
        user: state.auth.user,
        list: state.finances.list,
        visible: state.payment.visible,
        createMode: state.payment.createMode
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({getFinances, getPayment, changeVisible, changeMode, resetPayment},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Finances)