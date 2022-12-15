import { Status } from '@shared/enums/order-statuses'

export const getOrderStatusName = (status): string => {
  if (status.created || status.seen) {
    return Status.CREATED
  }

  if (status.confirmed) {
    return Status.CONFIRMED
  }

  if (status.inProcess) {
    return Status.IN_PROCESS
  }

  if (status.ready) {
    return Status.READY
  }

  if (status.completed) {
    return Status.COMPLETED
  }

  if (status.cancelled) {
    return Status.CANCELED
  }

  return ''
}
