import { useOrderRepository } from '@modules/order/repository'
import { IOrder } from '@ecommerce-platform/types'

const orderRepository = useOrderRepository()

export const actions = {
  async create(order: IOrder){
    try {
      const { data } = await orderRepository.create(order)
      this.orders = data.data

      return data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async read(params: any = null){
    try {
      const { data } = await orderRepository.read(params)

      this.$patch(state => {
        if (!params) {
          state.orders = data?.data
        } else {
          state.newOrders = data?.data
        }
      })

      return this.orders
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async update(updates){
    try {
      const { data } = await orderRepository.update(updates)

      this.$patch(state => {
        const ind = state.orders.findIndex(it => it._id === data?.data._id)

        state.orders.splice(ind, 1, data?.data)
      })

      return data?.data

    } catch (err) {
      return Promise.reject(err)
    }
  },

  async delete(id){
    try {
      const { data } = await orderRepository.delete(id)

      this.$patch(state => {
        state.orders = state.orders.filter(o => o._id !== id)
      })

      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
