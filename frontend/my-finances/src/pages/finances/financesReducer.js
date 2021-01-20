const INITIAL_STATE = {visible: false, list: []}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FINANCES_FETCH':
            return { ...state, list: action.payload.data }
        case 'CHANGE_VISIBLE':
            return {...state, visible: !state.visible}
        default:
            return state
    }
}