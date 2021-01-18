import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Finances from './pages/finances/Finances'
import Profile from './pages/profile/Profile'

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/dashboard/:useId' component={Dashboard} />
                <Route path='/finances/:useId' component={Finances} />
                <Route path='/profile/:useId' component={Profile} />
            </Switch>
        </Router>
    )
}