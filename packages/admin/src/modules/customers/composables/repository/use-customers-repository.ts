import { useSharedHttp } from '@shared/composables/use-http'

import { ICustomer } from '@proshop-app/types'

export const useCustomersRepository = () => {
    const { request, cancel } = useSharedHttp()

    const createCustomer = (customer: ICustomer) => request({
        url: '/api/v1/customer',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        body: customer
    })

    const getCustomers = (params: Partial<ICustomer>) => request({
        url: '/api/v1/customer',
        params
    })

    const updateCustomer = (updates: Partial<ICustomer>) => request({
        url: '/api/v1/customer',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        body: updates
    })

    const deleteCustomer = (id: string) => request({
        url: '/api/v1/customer',
        method: 'DELETE',
        params: { id }
    })

    return {
        createCustomer,
        getCustomers,
        updateCustomer,
        deleteCustomer,
        cancel
    }
}
