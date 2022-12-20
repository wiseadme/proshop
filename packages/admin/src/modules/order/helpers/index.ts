import { Status } from '@shared/enums/order-statuses'
import { IOrderStatuses } from '@ecommerce-platform/types'

export const getOrderStatusName = (status: IOrderStatuses): string => {
  let statusName = ''

  if (status.created) {
    statusName = Status.CREATED
  }

  if (status.seen) {
    statusName = Status.SEEN
  }

  if (status.confirmed) {
    statusName = Status.CONFIRMED
  }

  if (status.inProcess) {
    statusName = Status.IN_PROCESS
  }

  if (status.ready) {
    statusName = Status.READY
  }

  if (status.completed) {
    statusName = Status.COMPLETED
  }

  if (status.cancelled) {
    statusName = Status.CANCELED
  }

  return statusName
}
