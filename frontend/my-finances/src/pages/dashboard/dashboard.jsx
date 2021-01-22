import React from 'react'

import Charts from '../../components/charts/charts'

import './dashboard.css'

export default function Dashboard() {
    return (
        <div className="dashboard-content">
            <div className="panel-column">
                <Charts/>
            </div>
            <div className="panel-column">
                <div className="panel-info income">
                    <input value={2789.89} />
                    <label>Incomes</label>
                </div>
                <div className="panel-info expense">
                    <input value={789.89} />
                    <label>Expenses</label>
                </div>
                <div className="panel-info balance">
                    <input value={1789.89} />
                    <label>Balance</label>
                </div>
            </div>
        </div>
    )
}