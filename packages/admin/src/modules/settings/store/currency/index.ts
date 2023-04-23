import { defineStore } from 'nervue'
import { state } from '@modules/settings/store/currency/state'
import { actions } from '@modules/settings/store/currency/actions'

export const useCurrenciesStore = defineStore({
  id: 'currencies',
  state,
  actions
})
