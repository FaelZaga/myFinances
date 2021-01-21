import React, { Component } from 'react'
import { connect } from 'react-redux'

import './warning.css'

class Warning extends Component { 
    render() {
        const { title, msg, btnVisible } = this.props.warning
        return (
            <div className="content">
                <h3>{title}</h3>
                <p>{msg}</p>
                {btnVisible? <button className="btn transparent" onClick={this.props.onClick}>Ok</button>: null}
            </div>
        )
    }
}

const mapStateToProps = state => ({ warning: state.warning })
export default connect(mapStateToProps)(Warning)