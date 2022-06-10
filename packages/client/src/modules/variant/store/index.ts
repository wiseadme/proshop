import { defineStore } from 'pinia'
import { state } from './state'
import { actions } from './actions'

export const useVariantStore = defineStore<string, IVariantState, {}, IVariantActions>('variant', {
  state,
  actions
})
