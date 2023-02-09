import { defineStore } from 'nervue'
import { state } from '@modules/attributes/store/state'
import { actions } from '@modules/attributes/store/actions'
import { guards } from '@modules/attributes/store/guards'

const id = 'ATTRIBUTE'

export const useAttributeStore = defineStore({
  id,
  state,
  guards,
  actions,
})
