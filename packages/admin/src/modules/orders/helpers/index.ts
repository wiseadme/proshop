import { IOrderStatuses } from '@proshop/types'

import { OrderStatuses } from '@modules/orders/enums/status'

export const getOrderStatusName = (orderStatuses: IOrderStatuses): string => {
    let statusName = ''

    if (orderStatuses.created) statusName = OrderStatuses.created
    if (orderStatuses.seen) statusName = OrderStatuses.seen
    if (orderStatuses.confirmed) statusName = OrderStatuses.confirmed
    if (orderStatuses.inProcess) statusName = OrderStatuses.inProcess
    if (orderStatuses.ready) statusName = OrderStatuses.ready
    if (orderStatuses.inDelivery) statusName = OrderStatuses.inDelivery
    if (orderStatuses.completed) statusName = OrderStatuses.completed
    if (orderStatuses.cancelled) statusName = OrderStatuses.cancelled

    return statusName
}
