import { defineStore } from 'nervue'
import { state } from './state'
import { actions } from './actions'

export const useUnitsStore = defineStore({
  id: 'units',
  state,
  actions
})
