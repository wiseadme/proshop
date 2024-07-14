import { unref } from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

import { useRouter } from 'vue-router'

import { useOrderActionsModal } from '@modules/orders/composables/use-order-actions-modal'
import { useOrderModel } from '@modules/orders/composables/use-order-model'
import { useOrdersService } from '@modules/orders/composables/use-orders-service'

import { Order } from '@modules/orders/model/order.model'

import { IOrder } from '@proshop/types'

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

    const onOpenOrder = async (item: IOrder) => {
        if (!item.status.seen) {
            item.status.seen = true

            const order = await updateOrder({ status: unref(item).status })

            setOrderModel(Order.create(order!))
        } else {
            setOrderModel(Order.create(unref(item)!))
        }

        await router.push({
            name: RouteNames.ORDERS, params: {
                orderId: item.orderId,
            }
        })

        openOrder()
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
