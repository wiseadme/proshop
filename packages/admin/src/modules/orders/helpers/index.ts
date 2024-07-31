import { unref } from 'vue'

import type { IOrder, IOrderStatuses } from '@proshop-app/types'

import { orderStatusLabels, orderStatusSteps } from '@modules/orders/constants/statuses'
import { OrderProcessStatuses, OrderStatus } from '@modules/orders/enums/status'

export const getOrderStatusName = (orderStatuses: IOrderStatuses): string => {
    return orderStatusSteps.reduce((res, key) => {
        if (orderStatuses[key]) {
            res = orderStatusLabels[key]
        }

        if (orderStatuses[OrderStatus.CANCELLED]) {
            res = orderStatusLabels.cancelled
        }

        return res
    }, '')
}

export const isNeedExecutor = (key: string, model: IOrder) => (OrderProcessStatuses[key] && !unref(model).executor)

export const checkOrderStatusStep = (statusKey: string, statuses: Record<OrderStatus, boolean>): boolean => {
    const statusIndex = orderStatusSteps.findIndex(status => status === statusKey)

    /** TODO - доработать что если заказ уже выполнен, то отменить нельзя */

    if (statusIndex === 0 || statusKey === OrderStatus.CANCELLED) {
        return true
    }

    const status = orderStatusSteps[statusIndex]
    const prevStatus = orderStatusSteps[statusIndex - 1]
    const nextStatus = orderStatusSteps[statusIndex + 1]

    return !statuses[status] && statuses[prevStatus] && !statuses[nextStatus]
}
