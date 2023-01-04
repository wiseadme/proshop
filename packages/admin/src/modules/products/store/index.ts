import { defineStore } from 'nervue'
import { state } from '@modules/products/store/state'
import { actions } from '@modules/products/store/actions'
import { guards } from '@modules/products/store/guards'

export const useProductStore = defineStore({
  id: 'PRODUCT',
  state,
  guards,
  actions,
})
