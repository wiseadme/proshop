import { defineStore } from 'nervue'
import { state } from './state'
import { actions } from './actions'
import { expose } from '@modules/variant/store/expose'
import { IVariantState, IVariantActions } from '@modules/variant/types'

const id = 'VARIANT'

export const useVariantStore = defineStore<string, IVariantState, {}, {}, IVariantActions>({
  id,
  state,
  actions,
  expose
})
