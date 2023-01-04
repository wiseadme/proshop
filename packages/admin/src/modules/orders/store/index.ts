import { defineStore } from 'nervue'
import { state } from './state'
import { actions } from './actions'

export const useOrdersStore = defineStore({
  id: 'ORDERS',
  state,
  actions
})
