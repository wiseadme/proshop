export const usePolling = ({
  handler,
  timeout = 5000,
  onCancel = () => null
}) => {
  let timerId: any = null

  const startPolling = () => {
    const makeRequest = () => {
      timerId = setTimeout(() => {
        handler()
        makeRequest()
      }, timeout)
    }

    makeRequest()
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
