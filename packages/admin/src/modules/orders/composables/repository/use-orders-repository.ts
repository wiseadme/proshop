import { useSharedHttp } from '@shared/composables/use-http'

import type { IOrder } from '@proshop-app/types'

export const useOrdersRepository = () => {
    const { request, cancel } = useSharedHttp()

    const getOrders = (params: Partial<IOrder> & { seen?: boolean } = {}) => request<{
        items: IOrder[]
        total: number
    }>({
        url: '/api/v1/orders',
        params
    })

    const updateOrder = (updates: Partial<IOrder>) => request<IOrder>({
        url: '/api/v1/orders',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        body: updates,
    })

    const deleteOrder = (id: string) => request<boolean>({
        url: '/api/v1/orders',
        method: 'DELETE',
        params: { id },
    })

    const disbandOrder = (id: string) => request<boolean>({
        url: '/api/v1/orders/disband',
        params: { id },
    })

    return {
        getOrders,
        updateOrder,
        deleteOrder,
        disbandOrder,
        cancel
    }
}
