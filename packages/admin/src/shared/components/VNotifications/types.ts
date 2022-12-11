type NotifyActions = {
  ok: () => any
  dismiss: () => any
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
