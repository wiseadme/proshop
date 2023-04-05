import { defineStore } from 'nervue'
import { state } from './state'
import { actions } from './actions'

export const useMetaTagsStore = defineStore({
  id: 'metatags',
  state,
  actions
})
