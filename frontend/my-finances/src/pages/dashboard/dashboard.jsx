import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getBalance } from '../../store/actions/financesActions'

import Charts from '../../components/charts/charts'

import './dashboard.css'

function Dashboard(props) {
    const { id } = props.user
    const { balance, incomes, expenses } = props.balance

    useEffect(() => {
        loadBalance()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadBalance = () => {
        props.getBalance(id)
    }

    return (
        <div className="dashboard-content">
            <div className="panel-column">
                <Charts/>
            </div>
            <div className="panel-column">
                <div className="panel-info income">
                    <input value={`R$ ${incomes}`} />
                    <label>Incomes</label>
                </div>
                <div className="panel-info expense">
                    <input value={`R$ ${expenses}`} />
                    <label>Expenses</label>
                </div>
                <div className="panel-info balance">
                    <input value={`R$ ${balance}`} />
                    <label>Balance</label>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        balance: state.finances.balance,
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({ getBalance },dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)