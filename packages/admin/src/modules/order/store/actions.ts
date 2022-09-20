import { useOrderRepository } from '@modules/order/repository'
// import {  } from '../types'

const orderRepository = useOrderRepository()

export const actions = {
  async create(order) {
    return orderRepository.create(order)
  }
}
