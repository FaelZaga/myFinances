import axios from 'axios'
const BASE_URL = 'http://localhost:8080/api'

export function getFinances(values) {
    const request = axios.get(`${BASE_URL}/payments`, { params: values })
    return {
        type: 'FINANCES_FETCH',
        payload: request
    }
}

export function getBalance(id) {
    const request = axios.get(`${BASE_URL}/payments/${id}/balance`)
    return {
        type: 'BALANCE_FETCH',
        payload: request
    }
}

export function getChart(id,values) {
    const request = axios.get(`${BASE_URL}/payments/${id}/chart`, { params: values })
    return {
        type: 'CHART_FETCH',
        payload: request
    }
}