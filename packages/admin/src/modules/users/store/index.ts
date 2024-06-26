import { defineStore } from 'nervue'

import { actions } from './actions'
import { state } from './state'

export const useUserStore = defineStore({
    id: 'user',
    state,
    actions
})
