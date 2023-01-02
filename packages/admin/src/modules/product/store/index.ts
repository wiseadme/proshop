import { defineStore } from 'nervue'
import { state } from '@modules/product/store/state'
import { actions } from '@modules/product/store/actions'
import { guards } from '@modules/product/store/guards'

export const useProductStore = defineStore({
  id: 'PRODUCT',
  state,
  guards,
  actions,
})
