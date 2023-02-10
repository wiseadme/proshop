import { ref, unref, Ref } from 'vue'
import { IOrder } from '@ecommerce-platform/types'
// Stores
import { useOrdersStore } from '@modules/orders/store'
import { useUsersStore } from '@modules/users/store'

class Service {
  private _store: ReturnType<typeof useOrdersStore>
  private _usersStore: ReturnType<typeof useUsersStore>
  private _order: Ref<Maybe<IOrder>>

  public unsubscribe: Maybe<Function>

  constructor({ store, usersStore }) {
    this._store = store
    this._usersStore = usersStore
    this._order = ref(null)
    this.unsubscribe = null
  }

  get orders() {
    return this._store.orders
  }

  get newOrders() {
    return this._store.newOrders
  }

  get order() {
    return this._order.value
  }

  get users() {
    return this._usersStore.users
  }

  getUsers() {
    if (this.users) {
      return this.users
    }

    return this._usersStore.fetchUsers()
  }

  setAsCurrent(order) {
    this._order.value = order
  }

  async createOrder(order) {
    return this._store.create(order)
  }

  getOrders(params: Partial<IOrder> = {}) {
    return this._store.read(params)
  }

  getNewOrders() {
    return this._store.read({ seen: false })
  }

  updateOrder(updates) {
    updates._id = unref(this.order)!._id

    return this._store.update(updates)
  }

  addSubscriber() {
    this.unsubscribe = this._store.$subscribe({
      name: 'read',
      // before(params): any{
      //   console.log(params)
      // },
      // after(...result): any{
      //   console.log(...result)
      // }
    })
  }

  removeSubscriber() {
    this.unsubscribe?.()
  }

  async deleteOrder(orderId) {
    await this._store.delete(orderId)
  }
}

export const useOrdersService = () => new Service({
  store: useOrdersStore(),
  usersStore: useUsersStore(),
})
