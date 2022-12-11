export const usePolling = ({
  handler,
  timeout = 5000,
  onCancel = () => null
}) => {
  let timerId: any = null

  const startPolling = () => {
    const tryAgain = () => {
      timerId = setTimeout(() => {
        handler()
        tryAgain()
      }, timeout)
    }
    tryAgain()
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
