import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import axios from 'axios'

import { validateToken } from '../store/actions/userActions'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Login from '../pages/login/login'
import Routes from './routes'

import './app.css'

function App(props) {
  const { user, validToken } = props.user

  useEffect(() => {
    if (user) { props.validateToken({ "token": user.token, "valid": validToken }) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
 
  if (user && validToken) {
    axios.defaults.headers.common['Authorization'] = user.token
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }else if (!user && !validToken) {
    return ( <Login/> )
  }else {
    return false
  }
}

const mapStateToProps = state => ({ user: state.user })
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken },dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(App)
