export const useLogger = () => {
  const logError = (message: string, err: any) => {
    return console.log(message, err)
  }

  return {
    logError
  }
}
