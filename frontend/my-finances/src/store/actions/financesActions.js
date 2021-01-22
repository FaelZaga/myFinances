import axios from 'axios'
const BASE_URL = 'http://localhost:8080/api'

export function getFinances(values) {
    const request = axios.get(`${BASE_URL}/payments`, { params: values })
    return {
        type: 'FINANCES_FETCH',
        payload: request
    }
}