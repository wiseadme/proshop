import type { IOrder } from '@proshop-app/types'

import { rest } from '@shared/api'

const path = '/api/v1/orders'

export const useOrdersRepository = () => {
    const getOrders = (params: Partial<IOrder> & { seen?: boolean } = {}) => {
        return rest.get(`${path}`, { params })
    }

    const updateOrder = (updates: Partial<IOrder>) => {
        return rest.patch(path, updates)
    }

    const deleteOrder = (id: string) => {
        return rest.delete(path, { params: { id } })
    }

    const disbandOrder = (id: string) => {
        return rest.get(`${path}/disband`, { params: { id } })
    }

    return {
        getOrders,
        updateOrder,
        deleteOrder,
        disbandOrder
    }
}
