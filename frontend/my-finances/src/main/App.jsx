import React from 'react'
import { connect } from 'react-redux'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Login from '../pages/login/login'
import Routes from './routes'

import './app.css'

function App(props) {
  const { user } = props.auth
  if (user) {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }else if (!user) {
    return ( <Login/> )
  }else {
    return false
  }
}

const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(App)
