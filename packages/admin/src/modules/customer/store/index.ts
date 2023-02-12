import { defineStore } from 'nervue'
import { state } from './state'
import { actions } from './actions'

export const useCustomersStore = defineStore({
  id: 'customers',
  state,
  actions
})
