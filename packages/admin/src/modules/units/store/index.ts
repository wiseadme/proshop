import { defineStore } from 'nervue'
import { state } from './state'
import { actions } from './actions'

export const useUnitStore = defineStore({
  id: 'UNIT',
  state,
  actions
})
