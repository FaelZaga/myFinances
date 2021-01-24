import axios from 'axios'
import { setWarning } from './warningActions'
import { setMessage } from './messageActions'
const BASE_URL = 'http://localhost:8080/api'

export function signin(values) {
    return submit(values, `${BASE_URL}/users/auth`,
    { title: "Welcome!", msg: "welcome back again :)", signUp: false})
}

export function signup(values) {
    return submit(values, `${BASE_URL}/users`,
    { title: "Success!", msg: "welcome to myFinances!", signUp: true})
}

export function logout() {
    return { type: 'TOKEN_VALIDATED', payload: false }
}

function submit(values, url, msg) {
    return dispatch => {
        axios.post(url, values)
            .then(res => {
                dispatch(setWarning(msg))
                setTimeout(() => dispatch({ type: 'USER_FETCHED', payload: res.data}), 3000)
            }).catch(err => dispatch(setWarning({ title: "Something went wrong!", msg: err.response.data, signUp: msg.signUp, btnVisible: true })))
    }
}

export function update(id,values) {
    return dispatch => {
        axios.put(`${BASE_URL}/users/${id}`, values)
            .then(res => {
                dispatch(setMessage({ visible: true, title: "Done!", msg: "Profile updated", error: false}))
                dispatch({ type: 'USER_FETCHED', payload: res.data })
            }).catch(err => dispatch(setMessage({ visible: true, title: "Oops!", msg: err.response.data, error: true})))
    }
}

export function validateToken(values) {
    return dispatch => {
        if (values.token) {
            axios.post(`${BASE_URL}/users/validateToken`, values)
                .then(res => dispatch({ type: 'TOKEN_VALIDATED', payload: res.data.valid }))
                .catch(err => dispatch({ type: 'TOKEN_VALIDATED', payload: false }))
        } else {
            dispatch({ type: 'TOKEN_VALIDATED', payload: false })
        }
    }
}
