import axios from 'axios'
import { setMessage } from './messageActions'
import api from '../../main/api'

export function getPayment(id) {
    const request = axios.get(`${api.BASE_URL}/payments/${id}`)
    return {
        type: 'PAYMENT_FETCHED',
        payload: request
    }
}

export function createPayment(values) {
    return dispatch => {
        axios.post(`${api.BASE_URL}/payments/`,values)
            .then(res=> {
                dispatch(setMessage({ visible: true, title: "Done!", msg: "Created with success", error: false}))
                dispatch(resetAllPaymentState())
            }).catch(err=> dispatch(setMessage({ visible: true, title: "Oops!", msg: err.response.data, error: true})))
    }
}

export function updatePayment(values) {
    return dispatch => {
        axios.put(`${api.BASE_URL}/payments/${values.id}`,values)
            .then(res=> {
                dispatch(setMessage({ visible: true, title: "Done!", msg: "Updated with success", error: false}))
                dispatch(resetAllPaymentState())
            }).catch(err=> dispatch(setMessage({ visible: true, title: "Oops!", msg: err.response.data, error: true})))
    }
}

export function deletePayment(id) {
    return dispatch => {
        axios.delete(`${api.BASE_URL}/payments/${id}`)
            .then(res=> {
                dispatch(setMessage({ visible: true, title: "Done!", msg: "Deleted with success", error: false}))
                dispatch(resetAllPaymentState())
            }).catch(err=> dispatch(setMessage({ visible: true, title: "Oops!", msg: err.response.data, error: true})))
    }
}

export function resetAllPaymentState() {
    return {
        type: 'RESET_ALL_PAYMENT_STATE'
    }
}

export function resetPayment() {
    return {
        type: 'RESET_PAYMENT'
    }
}

export function changeVisible() {
    return {
        type: 'CHANGE_PAYMENT_VISIBLE'
    }
}

export function changeMode() {
    return {
        type: 'CHANGE_PAYMENT_MODE'
    }
}