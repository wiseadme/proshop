import { emitter } from './events'
import { Notify } from './types'

export const useNotifications = () => {
  const DEFAULT_TIMEOUT = 5000

  const notify = (params: Notify) => {
    params.id = Date.now()

    emitter.emit('add', params)

    if (!params.time) {
      params.time = DEFAULT_TIMEOUT
    }

    if (!params.type) {
      params.type = 'info'
    }

    if (!params.closeOnClick) {
      setTimeout(() => emitter.emit('remove', params), params.time)
    } else {
      delete params.time
    }
  }

  const clear = () => emitter.emit('clear')

  return {
    notify,
    clear
  }
}
