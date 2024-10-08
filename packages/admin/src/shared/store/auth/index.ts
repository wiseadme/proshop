import { defineStore } from 'nervue'

import { actions } from './actions'
import { state } from './state'

export const useAuthStore = defineStore({
    id: 'auth',
    state,
    actions
})
