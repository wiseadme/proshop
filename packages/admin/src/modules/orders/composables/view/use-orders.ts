import { unref } from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

import { useRouter } from 'vue-router'

import { useOrdersService } from '@modules/orders/composables/service/use-orders-service'
import { useOrderActionsModal } from '@modules/orders/composables/view/use-order-actions-modal'
import { useOrderModel } from '@modules/orders/composables/view/use-order-model'

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

    const onUpdateOrder = async (updates: Partial<IOrder>) => {
        try {
            await updateOrder(updates)
        } catch {
            notify(ORDER_UPDATE_ERROR)
        }
    }

    const onChangeOrderStatus = (statusKey: string) => {
        const { status, executor, id } = unref(model)

        const isValidStep = checkOrderStatusStep(statusKey, status)

        if (!isValidStep) {
            return notify(ORDER_STATUS_ALREADY_EXISTS_ERROR)
        }

        if (isNeedExecutor(statusKey, unref(model))) {
            return notify(ORDER_EXECUTOR_NOT_SELECTED_WARNING)
        }

        status[statusKey] = true

        return onUpdateOrder({
            status,
            id,
            executor: (executor as IUser)?.id ?? null
        })
    }

    const onOpenOrder = async (order: IOrder) => {
        const { status, id, orderId } = order

        setOrderModel(Order.create(order))

        if (!status.seen) {
            unref(model).status.seen = true
            await onUpdateOrder({ id, status })
        }

        router
            .push({ name: RouteNames.ORDERS, params: { orderId } })
            .then(openOrder)
    }

    const onDeleteOrder = (order: IOrder) => deleteOrder(order.id)

    return {
        sort,
        orders,
        pagination,
        totalLength,
        onOpenOrder,
        onUpdateOrder,
        onChangeOrderStatus,
        onDeleteOrder
    }
})
