import { emitter } from './events'
import { Notify } from './types'

export const useNotifications = () => {
    const DEFAULT_TIMEOUT = 5000

    const notify = (params: Notify): number => {
        params.id = Date.now()

        emitter.emit('add', params)

        if (!params.time) {
            params.time = DEFAULT_TIMEOUT
        }

        if (!params.type) {
            params.type = 'info'
        }

        if (params.closeOnClick) {
            emitter.emit('add-listener')
        }

        if (!params.actions) {
            setTimeout(() => emitter.emit('remove', params.id), params.time)
        } else {
            delete params.time
        }

        return params.id
    }

    const remove = (id) => emitter.emit('remove', id)
    const clear = () => emitter.emit('clear')

    return {
        notify,
        remove,
        clear,
    }
}
