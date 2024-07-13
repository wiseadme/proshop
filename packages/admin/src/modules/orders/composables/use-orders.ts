import { ref, unref } from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

import { useRouter } from 'vue-router'

import { useOrderActionsModal } from '@modules/orders/composables/use-order-actions-modal'
import { useOrdersService } from '@modules/orders/composables/use-orders-service'

import { Order } from '@modules/orders/model/order.model'

import { IOrder } from '@proshop/types'

import { RouteNames } from '@modules/orders/enums/route-names'

export const useOrders = createSharedComposable(() => {
    const {
        order,
        orders,
        users,
        totalLength,
        sort,
        pagination,
        getUsers,
        updateOrder,
        setAsCurrent,
        deleteOrder
    } = useOrdersService()

    const { openOrder } = useOrderActionsModal()

    const model = ref<IOrder>({} as IOrder)
    const router = useRouter()

    const onUpdateOrder = async (updates: Partial<IOrder>) => {
        const order = await updateOrder(updates) as IOrder

        setAsCurrent(order)
    }

    const onOpenOrder = async (item: IOrder) => {
        setAsCurrent(item)

        if (!item.status.seen) {
            item.status.seen = true

            const order = await updateOrder({ status: unref(item).status })

            model.value = Order.create(order!)
        } else {
            model.value = Order.create(unref(item)!)
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
        model,
        order,
        orders,
        users,
        totalLength,
        sort,
        pagination,
        getUsers,
        onOpenOrder,
        onUpdateOrder,
        onDeleteOrder
    }
})
