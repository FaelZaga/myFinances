export function setWarning(values) {
    return {
        type: 'WARNING_COMPLETED',
        payload: values
    }
}

export function warningReset() {
    return {
        type: 'WARNING_RESET'
    }
}