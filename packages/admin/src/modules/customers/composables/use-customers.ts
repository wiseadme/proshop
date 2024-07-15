import { useCustomersService } from '@modules/customers/composables/use-customers-service'

export const useCustomers = () => {
    const { customers, fetchCustomers } = useCustomersService()

    return {
        fetchCustomers,
        customers
    }
}
