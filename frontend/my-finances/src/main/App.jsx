import React from 'react'
import { connect } from 'react-redux'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Login from '../pages/login/login'
import Routes from './routes'

function App(props) {
  const { user } = props.auth
  if (user) {
    return (
      <div className="App" style={{ maxHeight : "100vh"}}>
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
