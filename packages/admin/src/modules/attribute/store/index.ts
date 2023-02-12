import { defineStore } from 'nervue'
import { state } from '@modules/attribute/store/state'
import { actions } from '@modules/attribute/store/actions'
import { guards } from '@modules/attribute/store/guards'

const id = 'ATTRIBUTE'

export const useAttributeStore = defineStore({
  id,
  state,
  guards,
  actions,
})
