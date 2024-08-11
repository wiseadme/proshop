import { unref } from 'vue'


import { useRouter } from 'vue-router'

import { useOrdersService } from '@modules/orders/composables/service/use-orders-service'
import { useOrderActionsModal } from '@modules/orders/composables/view/use-order-actions-modal'
import { useOrderModel } from '@modules/orders/composables/view/use-order-model'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import { Order } from '@modules/orders/model/order.model'

import type { IOrder, IUser } from '@proshop-app/types'

import {
    ORDER_EXECUTOR_NOT_SELECTED_WARNING,
    ORDER_STATUS_ALREADY_EXISTS_ERROR,
    ORDER_UPDATE_ERROR
} from '@modules/orders/constants/notifications'
import { RouteNames } from '@modules/orders/enums/route-names'
import { checkOrderStatusStep, isNeedExecutor } from '@modules/orders/helpers'

export const useOrders = createSharedComposable(() => {
    const {
        orders,
        totalLength,
        pagination,
        sort,
        updateOrder,
        deleteOrder
    } = useOrdersService()

    const router = useRouter()

    const { openOrder } = useOrderActionsModal()
    const { model, setOrderModel } = useOrderModel()
    const { notify } = useNotifications()

    const onChangeOrderStatus = async (statusKey: string) => {
        try {
            const { status, executor, id } = unref(model)

            const isValidStep = checkOrderStatusStep(statusKey, status)

            if (!isValidStep) {
                return notify(ORDER_STATUS_ALREADY_EXISTS_ERROR)
            }

            if (isNeedExecutor(statusKey, unref(model))) {
                return notify(ORDER_EXECUTOR_NOT_SELECTED_WARNING)
            }

            status[statusKey] = true

            return await updateOrder({
                status,
                id,
                executor: (executor as IUser)?.id ?? null
            })
        } catch {
            return notify(ORDER_UPDATE_ERROR)
        }
    }

    const onOpenOrder = async (order: IOrder) => {
        try {
            const { status, id, orderId } = order

            setOrderModel(Order.create(order))

            if (!status.seen) {
                unref(model).status.seen = true

                await updateOrder({ id, status })
            }

            router
                .push({ name: RouteNames.ORDERS, params: { orderId } })
                .then(openOrder)
        } catch {
            notify(ORDER_UPDATE_ERROR)
        }
    }

    const onCancelOrder = async () => {
        try {
            const { status, id } = unref(model)
            status.cancelled = true

            await updateOrder({ status, id })
        } catch {
            notify(ORDER_UPDATE_ERROR)
        }
    }

    const onDeleteOrder = (order: IOrder) => deleteOrder(order.id)

    return {
        sort,
        orders,
        pagination,
        totalLength,
        onOpenOrder,
        onChangeOrderStatus,
        onDeleteOrder,
        onCancelOrder
    }
})
