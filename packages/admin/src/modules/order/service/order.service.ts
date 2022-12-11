import { ref, Ref } from 'vue'
import { IOrder } from '@modules/order/types'
// Stores
import { useOrdersStore } from '@modules/order/store'

class Service {
  private _store: ReturnType<typeof useOrdersStore>
  private _order: Ref<Maybe<IOrder>>

  static instance: Service

  constructor({ store }){
    this._store = store
    this._order = ref(null)
  }

  get orders(){
    return this._store.orders
  }

  setAsCurrent(order){
    this._order = order
  }

  async createOrder(order){
    const newOrder = await this._store.create(order)

    return newOrder
  }

  getOrders(){
    return this._store.read()
  }

  static create(params){
    if (Service.instance) {
      return Service.instance
    }

    return new Service(params)
  }
}

export const useOrdersService = () => Service.create({
  store: useOrdersStore()
})
