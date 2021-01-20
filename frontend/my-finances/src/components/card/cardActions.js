import axios from 'axios'
const BASE_URL = 'http://localhost:8080/api'

export function reset() {
    return {
        type: 'RESET'
    }
}

export function getPayment(id) {
    const request = axios.get(`${BASE_URL}/payments/`+id)
    return {
        type: 'PAYMENT_FETCH',
        payload: request
    }
}

export function createPayment(values) {
    axios.post(`${BASE_URL}/payments/`,values)
    .then(res=> {
        console.log("saved with success")
    }).catch(err=> {
        console.log(err.response.data)
    })
}

export function updatePayment(values) {
    axios.put(`${BASE_URL}/payments/`+values.id,values)
    .then(res=> {
        console.log("updated with success")
    }).catch(err=> {
        console.log(err.response.data)
    })
}

export function deletePayment(id) {
    axios.delete(`${BASE_URL}/payments/`+id)
    .then(res=> {
        console.log("deleted with success")
    }).catch(err=> {
        console.log(err.response.data)
    })
}