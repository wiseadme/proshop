import { ref, unref } from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useOrdersService } from '@modules/order/composables/use-orders-service'
import { useOrderActionsModal } from '@modules/order/composables/use-order-actions-modal'
import { IOrder } from '@ecommerce-platform/types'
import { Order } from '@modules/order/model/order.model'

export const useOrders = createSharedComposable(() => {
  const {
    order,
    orders,
    updateOrder,
    setAsCurrent,
    deleteOrder
  } = useOrdersService()
  const { openOrder } = useOrderActionsModal()

  const model = ref<IOrder>({} as IOrder)

  const onUpdateOrder = (updates) => {
    updateOrder(updates).then(res => setAsCurrent(res))
  }

  const onOpenOrder = async (item) => {
    setAsCurrent(item)
    model.value = Order.create(unref(item)!)

    if (!item.status.seen) {
      const order = await updateOrder({ status: Object.assign({}, unref(item).status, { seen: true }) })
      model.value = Order.create(order!)
    }

    openOrder()
  }

  const onDeleteOrder = (order) => {
    deleteOrder(order._id)
  }

  return {
    model,
    order,
    orders,
    onOpenOrder,
    onUpdateOrder,
    onDeleteOrder
  }
})
