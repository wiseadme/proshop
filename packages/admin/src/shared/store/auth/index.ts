import { defineStore } from 'nervue'
import { state } from './state'
import { actions } from './actions'

const id = 'AUTH'

export const useAuthStore = defineStore({
  id,
  state,
  actions
})
