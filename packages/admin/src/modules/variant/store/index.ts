import { defineStore } from 'nervue'
import { state } from './state'
import { actions } from './actions'

export const useVariantsStore = defineStore({
    id: 'variants',
    state,
    actions,
})
