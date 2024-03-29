type NotifyActions = {
    buttons?: {
        ok?: {
            type: NotifyTypes,
            handler: (...args: any) => any
        },
        dismiss?: {
            type: NotifyTypes,
            handler: (...args: any) => any
        },
    }
    events?: {
        onClick?: (...args: any) => any
        onMouseenter?: (...args: any) => any
    }
}

type NotifyTypes = 'success' | 'warning' | 'error' | 'info' | 'simple'

export type Notify = {
    id?: number
    title?: string
    text?: string
    time?: number
    type?: NotifyTypes
    closeOnClick?: boolean
    actions?: NotifyActions
}
