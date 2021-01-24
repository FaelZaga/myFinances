import axios from 'axios'
const BASE_URL = 'http://localhost:8080/api'

export function getFinances(values) {
    return dispatch => {
        axios.get(`${BASE_URL}/payments`, { params: values })
        .then(res => {
            dispatch({
                type: 'FINANCES_FETCH',
                payload: res
            })
        }).catch(err => {
            dispatch({
                type: 'TOKEN_VALIDATED',
                payload: null
            })
        })
    }
}

export function getBalance(id) {
    return dispatch => {
        axios.get(`${BASE_URL}/payments/${id}/balance`)
        .then(res => {
            dispatch({
                type: 'BALANCE_FETCH',
                payload: res
            })
        }).catch(err => {
            dispatch({
                type: 'TOKEN_VALIDATED',
                payload: null
            })
        })
    }
}

export function getChart(id,values) {
    const request = axios.get(`${BASE_URL}/payments/${id}/chart`, { params: values })
    return {
        type: 'CHART_FETCH',
        payload: request
    }
}