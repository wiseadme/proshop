import { IOrderStatuses } from '@ecommerce-platform/types'
import { status } from '@modules/orders/enums/status'

export const getOrderStatusName = (orderStatuses: IOrderStatuses): string => {
  let statusName = ''

  if (orderStatuses.created) {
    statusName = status.created
  }

  if (orderStatuses.seen) {
    statusName = status.seen
  }

  if (orderStatuses.confirmed) {
    statusName = status.confirmed
  }

  if (orderStatuses.inProcess) {
    statusName = status.inProcess
  }

  if (orderStatuses.ready) {
    statusName = status.ready
  }

  if (orderStatuses.completed) {
    statusName = status.completed
  }

  if (orderStatuses.cancelled) {
    statusName = status.cancelled
  }

  return statusName
}
