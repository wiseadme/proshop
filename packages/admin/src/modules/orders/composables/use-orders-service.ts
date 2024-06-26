import {
    computed,
    ref,
    unref
} from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

import { useRequestParams } from '@shared/composables/use-request-params'

import {
    IOrder,
    IUser,
    Maybe
} from '@proshop/types'

// Stores
import { useOrdersStore } from '@modules/orders/store'
import { useUserStore } from '@modules/users/store'

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

    const updateOrder = async (updates: Partial<IOrder>) => {
        if (updates.executor) {
            updates.executor = (updates.executor as IUser).id
        }
        order.value = await _store.update({
            id: unref(order)!.id,
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
