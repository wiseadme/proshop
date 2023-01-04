import { defineStore } from 'nervue'
import { state } from '@modules/attributes/store/state'
import { actions } from '@modules/attributes/store/actions'

const id = 'ATTRIBUTE'

export const useAttributeStore = defineStore({
  id,
  state,
  actions,
})
