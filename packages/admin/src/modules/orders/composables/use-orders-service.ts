import {
    DeepReadonly,
    Ref,
    ref,
} from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

import { useOrdersRepository } from '@modules/orders/composables/use-orders-repository'

import { useRequestParams } from '@shared/composables/use-request-params'

import { useLogger } from '@shared/utils/logger'

import { IOrder, IUser } from '@proshop/types'


export const useOrdersService = createSharedComposable(() => {
    const repository = useOrdersRepository()

    const {
        sort,
        pagination,
        getSortParams,
        getPaginationParams,
    } = useRequestParams()

    const { logError } = useLogger()

    const _orders = ref<IOrder[]>([])
    const _newOrders = ref<IOrder[]>([])
    const _total = ref(0)

    const getOrders = async (params: Partial<IOrder> = {}) => {
        try {
            const { data } = await repository.getOrders({
                ...params,
                ...getSortParams(),
                ...getPaginationParams()
            })

            _orders.value = data.data.items
            _total.value = data.data.total
        } catch (err) {
            logError('OrdersService: orders loading failed', err)

            return Promise.reject(err)
        }
    }

    const getNewOrders = async () => {
        try {
            const { data } = await repository.getOrders({ seen: false })

            _newOrders.value = data.data.items
        } catch (err) {
            logError('OrdersService: new orders loading failed', err)

            return Promise.reject(err)
        }
    }

    const updateOrder = async (updates: Partial<IOrder>) => {
        try {
            if (updates.executor) {
                updates.executor = (updates.executor as IUser).id
            }

            const { data } = await repository.updateOrder(updates)

            return data.data
        } catch (err) {
            logError('OrdersService: order updating failed', err)

            return Promise.reject(err)
        }
    }

    const deleteOrder = async (id: string) => {
        try {
            const { data } = await repository.deleteOrder(id)

            return data.data
        } catch (err) {
            logError('OrdersService: order deleting failed', err)

            return Promise.reject(err)
        }
    }

    return {
        orders: _orders as Ref<DeepReadonly<IOrder>[]>,
        newOrders: _newOrders as Ref<DeepReadonly<IOrder>[]>,
        totalLength: _total as Ref<Readonly<number>>,
        sort,
        pagination,
        getOrders,
        getNewOrders,
        updateOrder,
        deleteOrder
    }
})
