const INITIAL_STATE = { visible: false, createMode: false, payment: [{
    "id": "","description": "","month": "","year": "","value": "","type": "",
    "status": "","user": ""}]}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PAYMENT_FETCHED':
            return { ...state, payment: action.payload.data }
        case 'CARD_CHANGE_VISIBLE':
            return { ...state, visible: !state.visible }
        case 'CARD_CHANGE_MODE':
            return { ...state, createMode: !state.createMode }
        case 'CARD_CLEAN_PAYMENT':
            return { ...state, payment: [{"id":"","description":"","month":"","year":"",
            "value":"","type":"","status":"","user":""}] }
        case 'CARD_RESET':
            return INITIAL_STATE
        default:
            return state
    }
}