import {
    DeepReadonly,
    Ref,
    ref
} from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

import {
    useCustomersRepository
} from '@modules/customers/composables/repository/use-customers-repository'

import { useLogger } from '@shared/utils/logger'

import { ICustomer } from '@proshop-app/types'

export const useCustomersService = createSharedComposable(() => {
    const repository = useCustomersRepository()
    const { logError } = useLogger()

    const _customers = ref<ICustomer[]>([])

    const getCustomers = async (params: Partial<ICustomer>) => {
        try {
            const { data } = await repository.getCustomers(params)
            _customers.value = data
        } catch (err) {
            logError('Customers Service: customers loading failed', err)
        }
    }

    return {
        customers: _customers as Ref<DeepReadonly<ICustomer>[]>,
        getCustomers,
        cancelRequests: repository.cancel,
    }
})
