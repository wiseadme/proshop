import { defineStore } from 'nervue'
import { actions } from '@modules/product/store/actions'
import { state } from '@modules/product/store/state'
import { IProductState, IProductActions } from '@modules/order/types'

const id = 'PRODUCT'

export const useProductStore = defineStore<string, IProductState, {}, {}, IProductActions>({
  id,
  state,
  actions,
})
