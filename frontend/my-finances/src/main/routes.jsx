import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Dashboard from '../pages/dashboard/dashboard'
import Finances from '../pages/finances/finances'

import Navbar from '../components/navbar/Navbar'
import Message from '../components/message/message'

export default function Routes() {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/finances' component={Finances} />
            </Switch>
            <Redirect from='*' to='/'/>
            <Message/>
        </Router>
    )
}