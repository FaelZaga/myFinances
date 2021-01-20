import axios from 'axios'

import { setMessage } from '../message/messageActions'

const BASE_URL = 'http://localhost:8080/api'

export function reset() {
    return {
        type: 'CARD_RESET'
    }
}

export function cleanPayment() {
    return {
        type: 'CARD_CLEAN_PAYMENT'
    }
}

export function changeVisible() {
    return {
        type: 'CARD_CHANGE_VISIBLE'
    }
}

export function changeMode() {
    return {
        type: 'CARD_CHANGE_MODE'
    }
}

export function getPayment(id) {
    const request = axios.get(`${BASE_URL}/payments/`+id)
    return {
        type: 'PAYMENT_FETCHED',
        payload: request
    }
}

export function createPayment(values) {
    return dispatch => {
        axios.post(`${BASE_URL}/payments/`,values)
            .then(res=> {
                dispatch(setMessage({ visible: true, title: "Success", msg: "Created with success", error: false}))
                dispatch(reset())
            }).catch(err=> {
                dispatch(setMessage({ visible: true, title: "Error", msg: err.response.data, error: true}))
            })
    }
}

export function updatePayment(values) {
    return dispatch => {
        axios.put(`${BASE_URL}/payments/`+values.id,values)
            .then(res=> {
                dispatch(setMessage({ visible: true, title: "Success", msg: "Updated with success", error: false}))
                dispatch(reset())
            }).catch(err=> {
                dispatch(setMessage({ visible: true, title: "Error", msg: err.response.data, error: true}))
            })
    }
}

export function deletePayment(id) {
    return dispatch => {
        axios.delete(`${BASE_URL}/payments/`+id)
            .then(res=> {
                dispatch(setMessage({ visible: true, title: "Success", msg: "Deleted with success", error: false}))
                dispatch(reset())
            }).catch(err=> {
                dispatch(setMessage({ visible: true, title: "Error", msg: err.response.data, error: true}))
            })
    }
}