import { useOrderRepository } from '@modules/order/repository'
// import {  } from '../types'

const orderRepository = useOrderRepository()

export const actions = {
  async create(order){
    try {
      const { data } = await orderRepository.create(order)
      this.orders = data.data

      return data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async read(){
    try {
      const { data } = await orderRepository.read()
      this.orders = data?.data

      return this.orders
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
