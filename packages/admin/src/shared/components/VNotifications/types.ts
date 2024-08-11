type NotifyActions = {
    buttons?: {
        ok?: {
            type: NotifyTypes,
            label: string;
            handler: (...args: any) => any
        },
        dismiss?: {
            type: NotifyTypes,
            label: string;
            handler: (...args: any) => any
        },
    }
    events?: {
        onClick?: (...args: any) => any
        onMouseenter?: (...args: any) => any
    }
}

type NotifyTypes = 'success' | 'warning' | 'error' | 'info' | 'simple'

export enum NotificationTypes {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning',
}
export type Notify = {
    id?: number
    title?: string
    text?: string
    time?: number
    type?: NotifyTypes
    closeOnClick?: boolean
    actions?: NotifyActions
}
