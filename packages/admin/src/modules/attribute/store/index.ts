import { defineStore } from 'nervue'
import { state } from '@modules/attribute/store/state'
import { actions } from '@modules/attribute/store/actions'

const id = 'ATTRIBUTE'

export const useAttributeStore = defineStore({
  id,
  state,
  actions,
})
