import { defineStore } from 'nervue'
import { state } from '@modules/settings/store/merchant/state'
import { actions } from '@modules/settings/store/merchant/actions'

export const useMerchantStore = defineStore({
  id: 'merchant',
  state,
  actions
})
