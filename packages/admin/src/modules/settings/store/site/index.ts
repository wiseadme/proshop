import { defineStore } from 'nervue'
import { state } from './state'
import { actions } from './actions'

export const useSiteStore = defineStore({
    id: 'site',
    state,
    actions
})
