import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './pages/login/login'
import Dashboard from './pages/dashboard/dashboard'

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/dashboard' component={Dashboard} />
            </Switch>
        </Router>
    )
}