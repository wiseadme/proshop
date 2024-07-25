import { useCustomersService } from '@modules/customers/composables/use-customers-service'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import { CUSTOMERS_LOADING_ERROR } from '@modules/customers/constants/notifications'


export const useCustomers = () => {
    const { customers, getCustomers } = useCustomersService()
    const { notify } = useNotifications()

    const loadCustomers = async (params = {}) => {
        try {
            return await getCustomers(params)
        } catch (err) {
            notify(CUSTOMERS_LOADING_ERROR)
        }
    }

    return {
        loadCustomers,
        customers
    }
}
