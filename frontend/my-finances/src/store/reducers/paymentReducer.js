const paymentValues = {
    "id": "",
    "description": "",
    "month": "",
    "year": "",
    "value": "",
    "type": "",
    "status": "",
    "user": ""
}
const INITIAL_STATE = { visible: false, createMode: false, payment: [paymentValues]}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PAYMENT_FETCHED':
            return { ...state, payment: action.payload.data }
        case 'CHANGE_PAYMENT_VISIBLE':
            return { ...state, visible: !state.visible }
        case 'CHANGE_PAYMENT_MODE':
            return { ...state, createMode: !state.createMode }
        case 'RESET_PAYMENT':
            return { ...state, payment: [paymentValues] }
        case 'RESET_ALL_PAYMENT_STATE':
            return INITIAL_STATE
        default:
            return state
    }
}