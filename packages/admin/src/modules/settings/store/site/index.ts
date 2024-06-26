import { defineStore } from 'nervue'

import { actions } from './actions'
import { state } from './state'

export const useSiteStore = defineStore({
    id: 'site',
    state,
    actions
})
