import { defineStore } from 'pinia'
import { actions } from '@modules/product/store/actions'
import { state } from '@modules/product/store/state'

export const useProductStore = defineStore<string, IProductState, {}, IProductActions>('product', {
  state,
  actions,
})
