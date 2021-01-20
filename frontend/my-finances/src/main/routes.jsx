import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Dashboard from '../pages/dashboard/dashboard'
import Finances from '../pages/finances/finances'
import Profile from '../pages/profile/profile'

import Navbar from '../components/navbar/Navbar'
import Message from '../components/message/message'

export default function Routes() {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/finances' component={Finances} />
                <Route path='/profile' component={Profile} />
            </Switch>
            <Redirect from='*' to='/'/>
            <Message/>
        </Router>
    )
}