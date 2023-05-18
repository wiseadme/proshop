import {
    computed,
    ref,
    unref
} from 'vue'
import {
    IOrder,
    IUser,
    Maybe
} from '@ecommerce-platform/types'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useRequestParams } from '@shared/composables/use-request-params'
// Stores
import { useOrdersStore } from '@modules/order/store'
import { useUserStore } from '@modules/user/store'

export const useOrdersService = createSharedComposable(() => {
    const _store = useOrdersStore()
    const _usersStore = useUserStore()
    const {
        sort,
        pagination,
        getSortParams,
        getPaginationParams,
    } = useRequestParams()

    const order = ref<Maybe<IOrder>>(null)

    const orders = computed<Maybe<IOrder[]>>(() => _store.orders)
    const newOrders = computed<Maybe<IOrder[]>>(() => _store.newOrders)
    const users = computed<Maybe<IUser[]>>(() => _usersStore.users)
    const totalLength = computed(() => _store.totalLength)

    const getUsers = () => unref(users) ? unref(users) : _usersStore.fetchUsers()
    const setAsCurrent = (item: IOrder) => order.value = item
    // const createOrder = (order: IOrder) => _store.create(order)
    const getOrders = (params: Partial<IOrder> = {}) => _store.read({
        ...params,
        ...getSortParams(),
        ...getPaginationParams()
    })

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
        users,
        sort,
        newOrders,
        pagination,
        totalLength,
        getUsers,
        getOrders,
        // createOrder,
        setAsCurrent,
        getNewOrders,
        updateOrder,
        deleteOrder
    }
})
