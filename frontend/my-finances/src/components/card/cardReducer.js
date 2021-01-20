const INITIAL_STATE = {visible: false, payment: [{
    "id": "",
    "description": "",
    "month": "",
    "year": "",
    "value": "",
    "type": "",
    "status": "",
    "user": ""
}]}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PAYMENT_FETCH':
            return { ...state, payment: action.payload.data }
        case 'RESET':
            return INITIAL_STATE
        default:
            return state
    }
}