import { useEventEmitter } from './use-event-emitter'
import { Notify } from './types'

export const useNotifications = () => {
    const DEFAULT_TIMEOUT = 1500

    const { emit } = useEventEmitter()

    const notify = (params: Notify): number => {
        params.id = Date.now()

        emit('add', params)

        if (!params.time) {
            params.time = DEFAULT_TIMEOUT
        }

        if (!params.type) {
            params.type = 'info'
        }

        if (params.closeOnClick) {
            emit('add-listener')
        }

        if (!params.actions) {
            setTimeout(() => emit('remove', params.id), params.time)
        } else {
            delete params.time
        }

        return params.id
    }

    const remove = (id) => emit('remove', id)
    const clear = () => emit('clear')

    return {
        notify,
        remove,
        clear,
    }
}
