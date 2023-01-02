import { ref, Ref } from 'vue'
import { IOrder } from '@ecommerce-platform/types'
// Stores
import { useOrdersStore } from '@modules/order/store'

class Service {
  private _store: ReturnType<typeof useOrdersStore>
  private _order: Ref<Maybe<IOrder>>

  constructor({ store }){
    this._store = store
    this._order = ref(null)
  }

  get orders(){
    return this._store.orders
  }

  get newOrders(){
    return this._store.newOrders
  }

  get order(){
    return this._order
  }

  setAsCurrent(order){
    this._order = order
  }

  async createOrder(order){
    return this._store.create(order)
  }

  getOrders(params: any = null){
    return this._store.read(params)
  }

  getNewOrders(){
    return this._store.read({ seen: false })
  }

  updateOrder(updates){
    return this._store.update(updates)
  }

  async deleteOrder(orderId){
    await this._store.delete(orderId)
  }
}

export const useOrdersService = () => new Service({
  store: useOrdersStore()
})
