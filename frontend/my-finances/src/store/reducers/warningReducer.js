const INITIAL_STATE = { title: "", msg: "", signUp: false, btnVisible: false }

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'WARNING_COMPLETED':
            return { ...state,
                title: action.payload.title,
                msg: action.payload.msg,
                signUp: action.payload.signUp,
                btnVisible: action.payload.btnVisible
            }
        case 'WARNING_RESET':
            return INITIAL_STATE
        default:
            return state
    }
}