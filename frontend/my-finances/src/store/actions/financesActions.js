import axios from 'axios'
import api from '../../main/api'

export function getFinances(values) {
    return dispatch => {
        axios.get(`${api.BASE_URL}/payments`, { params: values })
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
        axios.get(`${api.BASE_URL}/payments/${id}/balance`)
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
    const request = axios.get(`${api.BASE_URL}/payments/${id}/chart`, { params: values })
    return {
        type: 'CHART_FETCH',
        payload: request
    }
}