import { defineStore } from 'nervue'
import { state } from './state'
import { actions } from './actions'

export const useAuthStore = defineStore({
    id: 'AUTh',
    state,
    actions
})
