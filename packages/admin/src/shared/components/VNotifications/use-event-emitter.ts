import { createSharedComposable } from '@shared/features/create-shared-composable'

export const useEventEmitter = createSharedComposable(() => {
    const events = {}

    const on = (event: string, fn: (...args: any[]) => any) => {
        if (!events[event]) {
            events[event] = []
        }

        events[event].push(fn)
    }

    const off = (event: string, fn: (...args: any[]) => any) => {
        events[event].filter((cb) => cb !== fn)
    }

    const emit = (event: string, ...args: any[]) => {
        events[event].forEach(fn => fn(...args))
    }

    return {
        on,
        off,
        emit
    }
})
