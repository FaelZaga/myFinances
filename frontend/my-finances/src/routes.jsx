import React from 'react'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'

import Navbar from './components/navbar/Navbar'

import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Finances from './pages/finances/Finances'
import Profile from './pages/profile/Profile'

export default function Routes() {
    const location = useLocation();
    return (
        <Router>
            {location.pathname === '/' ? null : <Navbar/> }
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/finances' component={Finances} />
                <Route path='/profile' component={Profile} />
            </Switch>
        </Router>
    )
}