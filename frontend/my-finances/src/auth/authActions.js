import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api'

export function signin(values) {
    return submit(values, `${BASE_URL}/users/auth`)
}

export function signup(values) {
    return submit(values, `${BASE_URL}/users`)
}

export function logout() {
    return { type: 'TOKEN_VALIDATED', payload: false }
}

function submit(values, url) {
    return dispatch => {
        axios.post(url, values)
            .then(res => {
                dispatch(
                    { type: 'USER_FETCHED', payload: res.data }
                )
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }
}
