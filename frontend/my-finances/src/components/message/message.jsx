import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { messageReset } from '../../store/actions/messageActions'

import './message.css'

class Message extends Component {
    constructor(props) {
        super(props)
        this.interval = null
    }

    componentDidMount() {
        this.interval = setTimeout(() => this.props.setMessageReset(), 3000)
    }

    componentDidUpdate() {
        clearTimeout(this.interval)
        this.interval = setTimeout(() => this.props.setMessageReset(), 3000)
    }
    
    render() {
        const { visible, title, msg, error } = this.props.message
        return (
            <div className={ visible ? "message-content active" : "message-content"}
            style = {error? { backgroundColor: "#b91c1c"} : { backgroundColor: "#149b4f"} }
            >
                <div className="message-header">
                    <span>{title}</span>
                </div>
                <div className="message-body">
                    <span>{msg}</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ message: state.message })
const mapDispatchToProps = dispatch => bindActionCreators({ setMessageReset: messageReset },dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Message)