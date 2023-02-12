import { useCustomersStore } from '@modules/customer/store'

class Service {
  private _store: ReturnType<typeof useCustomersStore>

  constructor({ store }) {
    this._store = store
  }

  get customers() {
    return this._store.customers
  }

  fetchCustomers() {
    return this._store.getCustomers()
  }
}

export const useCustomersService = () => new Service({
  store: useCustomersStore()
})
