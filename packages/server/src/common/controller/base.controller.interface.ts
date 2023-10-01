import { ErrorOptions, SendOptions } from '@/types'

export interface IBaseController {
    send: (options: SendOptions) => void,
    error: (options: ErrorOptions) => any
}
