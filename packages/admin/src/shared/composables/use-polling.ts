export const DEFAULT_TIMEOUT = 5000

export const usePolling = ({
    handler,
    timeout = DEFAULT_TIMEOUT,
    onCancel = () => null
}) => {
    let timerId: any = null

    const startPolling = () => {
        const executeHandler = () => {
            timerId = setTimeout(() => {
                handler()
                executeHandler()
            }, timeout)
        }

        executeHandler()
    }

    const stopPolling = () => {
        clearTimeout(timerId)

        if (onCancel) {
            onCancel()
        }
    }

    return {
        startPolling,
        stopPolling
    }
}
