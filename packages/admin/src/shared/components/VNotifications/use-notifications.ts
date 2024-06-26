import { Notify } from './types'
import { useEventEmitter } from './use-event-emitter'

const DEFAULT_TIMEOUT = 3000

export const useNotifications = () => {
    const { emit } = useEventEmitter()

    const notify = (params: Notify) => {
        const notification = { ...params }
        notification.id = Date.now()

        emit('add', notification)

        if (!notification.time) {
            notification.time = DEFAULT_TIMEOUT
        }

        if (!notification.type) {
            notification.type = 'info'
        }

        if (notification.closeOnClick) {
            emit('add-listener')
        }

        if (!notification.actions) {
            setTimeout(() => emit('remove', notification.id), notification.time)
        } else {
            delete notification.time
        }
    }

    const remove = (id: number) => emit('remove', id)
    const clear = () => emit('clear')

    return {
        notify,
        remove,
        clear,
    }
}
