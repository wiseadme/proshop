import { useSharedHttp } from '@shared/composables/use-http'

import type { IOrder } from '@proshop-app/types'

export const useOrdersRepository = () => {
    const { request, cancel } = useSharedHttp()

    const getOrders = (params: Partial<IOrder> & { seen?: boolean } = {}) => request({
        url: '/api/v1/orders',
        credentials: 'same-origin',
        cache: 'no-cache',
        params
    })

    const updateOrder = (updates: Partial<IOrder>) => request({
        url: '/api/v1/orders',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        credentials: 'same-origin',
        cache: 'no-cache',
        body: updates,
    })

    const deleteOrder = (id: string) => request({
        url: '/api/v1/orders',
        method: 'DELETE',
        credentials: 'same-origin',
        params: { id },
        cache: 'no-cache',
    })

    const disbandOrder = (id: string) => request({
        url: '/api/v1/orders/disband',
        credentials: 'same-origin',
        params: { id },
        cache: 'no-cache',
    })

    return {
        getOrders,
        updateOrder,
        deleteOrder,
        disbandOrder,
        cancel
    }
}
