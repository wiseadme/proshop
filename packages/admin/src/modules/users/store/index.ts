import { defineStore } from 'nervue'
import { state } from './state'
import { actions } from './actions'

export const useUserStore = defineStore({
    id: 'user',
    state,
    actions
})
