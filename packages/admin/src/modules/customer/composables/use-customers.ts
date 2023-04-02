// import { useCustomersStore } from '@modules/customer/store'
import { useCustomersService } from '@modules/customer/composables/use-customers-service'

export const useCustomers = () => {
  const { customers, fetchCustomers } = useCustomersService()
  
  return {
    fetchCustomers,
    customers
  }
}
