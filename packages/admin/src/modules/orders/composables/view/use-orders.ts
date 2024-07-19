import { createSharedComposable } from '@shared/features/create-shared-composable'

import { useRouter } from 'vue-router'

import { useOrdersService } from '@modules/orders/composables/service/use-orders-service'
import { useOrderActionsModal } from '@modules/orders/composables/view/use-order-actions-modal'
import { useOrderModel } from '@modules/orders/composables/view/use-order-model'

import { Order } from '@modules/orders/model/order.model'

import type { IOrder } from '@proshop-app/types'

import { RouteNames } from '@modules/orders/enums/route-names'

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
    const { setOrderModel } = useOrderModel()

    const onUpdateOrder = async (updates: Partial<IOrder>) => {
        return await updateOrder(updates)
    }

    const onOpenOrder = async (order: IOrder) => {
        const { status, id, orderId } = order

        if (!status.seen) {
            status.seen = true
            order = await updateOrder({ id, status })
        }

        setOrderModel(Order.create(order))

        router
            .push({ name: RouteNames.ORDERS, params: { orderId } })
            .then(openOrder)
    }

    const onDeleteOrder = (order: IOrder) => deleteOrder(order.id)

    return {
        orders,
        totalLength,
        pagination,
        sort,
        onOpenOrder,
        onUpdateOrder,
        onDeleteOrder
    }
})
