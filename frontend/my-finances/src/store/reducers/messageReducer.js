const INITIAL_STATE = { visible: false, title: "", msg: "", error: false }

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'MESSAGE_COMPLETED':
            return { ...state,
                visible: action.payload.visible,
                title: action.payload.title,
                msg: action.payload.msg,
                error: action.payload.error
            }
        case 'MESSAGE_RESET':
            return INITIAL_STATE
        default:
            return state
    }
}