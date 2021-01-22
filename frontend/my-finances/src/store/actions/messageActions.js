export function setMessage(values) {
    return {
        type: 'MESSAGE_COMPLETED',
        payload: values
    }
}

export function messageReset() {
    return {
        type: 'MESSAGE_RESET'
    }
}