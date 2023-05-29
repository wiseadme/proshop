import { computed } from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useCustomersStore } from '@modules/customer/store'
import { ICustomer, Maybe } from '@proshop/types'

export const useCustomersService = createSharedComposable(() => {
    const _store = useCustomersStore()

    const customers = computed<Maybe<ICustomer[]>>(() => _store.customers)

    const fetchCustomers = () => {
        return _store.getCustomers()
    }

    return {
        customers,
        fetchCustomers
    }
})
