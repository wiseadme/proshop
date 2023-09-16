import { useEventEmitter } from './use-event-emitter'
import { Notify } from './types'

export const useNotifications = () => {
    const DEFAULT_TIMEOUT = 1500

    const { emit } = useEventEmitter()

    const notify = (params: Notify): number => {
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

        return notification.id
    }

    const remove = (id: number) => emit('remove', id)
    const clear = () => emit('clear')

    return {
        notify,
        remove,
        clear,
    }
}
