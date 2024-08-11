import {
    DeepReadonly,
    Ref,
    ref,
    unref
} from 'vue'

import { useOrdersRepository } from '@modules/orders/composables/repository/use-orders-repository'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'
import { useRequestParams } from '@shared/composables/use-request-params'

import { useLogger } from '@shared/utils/logger'

import type { IOrder } from '@proshop-app/types'

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

            _orders.value = data.items
            _total.value = data.total
        } catch (err) {
            logError('Orders Service: orders loading failed', err)

            return Promise.reject(err)
        }
    }

    const getNewOrders = async () => {
        try {
            const { data } = await repository.getOrders({ seen: false })

            _newOrders.value = data.items
        } catch (err) {
            logError('Orders Service: new orders loading failed', err)

            return Promise.reject(err)
        }
    }

    const updateOrder = async (updates: Partial<IOrder>): Promise<IOrder> => {
        try {
            const { data } = await repository.updateOrder(updates)

            _orders.value = unref(_orders).map(item => {
                return item.id === data.id ? data : item
            })

            return data
        } catch (err) {
            logError('Orders Service: order updating failed', err)

            return Promise.reject(err)
        }
    }

    const deleteOrder = async (id: string) => {
        try {
            const { data } = await repository.deleteOrder(id)

            _orders.value = unref(_orders).filter(item => item.id !== id)

            return data
        } catch (err) {
            logError('Orders Service: order deleting failed', err)

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
