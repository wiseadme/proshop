import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

export const useEventEmitter = createSharedComposable(() => {
    const events = {}

    const on = (event: string, fn: (...args: any[]) => any) => {
        events[event] ??= []
        events[event].push(fn)
    }

    const off = (event: string, fn: (...args: any[]) => any) => {
        events[event].filter((cb: (...args: any[]) => any) => cb !== fn)
    }

    const emit = (event: string, ...args: any[]) => {
        events[event].forEach((fn: (...args: any[]) => any) => fn(...args))
    }

    return {
        on,
        off,
        emit
    }
})
