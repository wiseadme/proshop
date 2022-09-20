import { defineStore } from 'nervue'
import { state } from './state'
import { actions } from './actions'

const id = 'FILES'

export const useFilesStore = defineStore({
  id,
  state,
  actions
})
