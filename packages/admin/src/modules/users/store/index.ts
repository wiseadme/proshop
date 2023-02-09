import { defineStore } from 'nervue'
import { state } from './state'
import { actions } from './actions'

export const useUsersStore = defineStore({
  id: 'users',
  state,
  actions
})
