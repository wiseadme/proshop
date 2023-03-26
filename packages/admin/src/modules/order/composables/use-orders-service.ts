import { computed, ref, unref } from 'vue'
import { IOrder, Maybe } from '@ecommerce-platform/types'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useRequestParams } from '@shared/composables/use-request-params'
// Stores
import { useOrdersStore } from '@modules/order/store'
import { useUserStore } from '@modules/user/store'

export const useOrdersService = createSharedComposable(() => {
  const _store = useOrdersStore()
  const _usersStore = useUserStore()
  const { getSortParams, getPaginationParams, pagination, sort } = useRequestParams()

  const order = ref<Maybe<IOrder>>(null)

  const orders = computed<Maybe<IOrder[]>>(() => _store.orders)
  const newOrders = computed<Maybe<IOrder[]>>(() => _store.newOrders)
  const users = computed(() => _usersStore.users)

  const getUsers = () => unref(users) ? unref(users) : _usersStore.fetchUsers()

  const setAsCurrent = (item) => order.value = item

  const createOrder = (order) => _store.create(order)

  const getOrders = (params: Partial<IOrder> = {}) => {
    return _store.read({
      ...params,
      ...getSortParams(),
      ...getPaginationParams()
    })
  }

  const getNewOrders = () => _store.read({ seen: false })

  const updateOrder = async (updates) => {
    order.value = await _store.update({
      _id: unref(order)!._id,
      ...updates
    })

    return unref(order)
  }

  const deleteOrder = (orderId) => _store.delete(orderId)

  return {
    order,
    orders,
    newOrders,
    users,
    pagination,
    sort,
    getUsers,
    setAsCurrent,
    createOrder,
    getOrders,
    getNewOrders,
    updateOrder,
    deleteOrder
  }
})
