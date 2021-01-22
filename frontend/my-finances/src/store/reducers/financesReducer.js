const INITIAL_STATE = {list: []}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FINANCES_FETCH':
            return { ...state, list: action.payload.data }
        default:
            return state
    }
}