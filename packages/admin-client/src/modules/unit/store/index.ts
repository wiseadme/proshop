import { defineStore } from 'pinia'
import { state } from './state'
import { actions } from './actions'

export const useUnitStore = defineStore<string, IUnitState, {}, IUnitActions>('unit', {
  state,
  actions
})
