const INITIAL_STATE = {finances: [], balance: []}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FINANCES_FETCH':
            return { ...state, finances: action.payload.data }
        case 'BALANCE_FETCH':
            return { ...state, balance: action.payload.data }
        default:
            return state
    }
}