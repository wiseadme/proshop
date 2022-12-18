import { defineStore } from 'nervue'
import { state } from './state'
import { actions } from './actions'

export const useVariantStore = defineStore({
  id: 'VARIANT',
  state,
  actions,
})
