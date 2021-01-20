export function setMessage(values) {
    return {
        type: 'MESSAGE_COMPLETED',
        payload: values
    }
}

export function setMessageReset() {
    return {
        type: 'MESSAGE_RESET'
    }
}