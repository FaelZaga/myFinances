import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getBalance, getChart } from '../../store/actions/financesActions'

import Charts from '../../components/charts/charts'

import './dashboard.css'

function Dashboard(props) {
    const { id } = props.user
    const { balance, incomes, expenses } = props.balance
    const balances = props.balances
    const date = new Date()

    useEffect(() => {
        loadBalance()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [balances])

    const loadBalance = () => {
        props.getBalance(id)
        props.getChart(id,{ month: date.getMonth()+1, year: date.getFullYear() })
    }

    return (
        <div className="dashboard-content">
            <div className="chart-content chart">
                <Charts data={balances.reverse()}/>
            </div>
            <div className="chart-content footer">
                <div className="panel-column income">
                    <label>{`R$ ${incomes}`}</label>
                    <label>INCOMES</label>
                </div>
                <div className="panel-column expense">
                    <label>{`R$ ${expenses}`}</label>
                    <label>EXPENSES</label>
                </div>
                <div className="panel-column balance">
                    <label>{`R$ ${balance}`}</label>    
                    <label>BALANCE</label>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        balance: state.finances.balance,
        balances: state.finances.balances
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({ getBalance, getChart },dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)