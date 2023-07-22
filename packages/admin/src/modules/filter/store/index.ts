import { defineStore } from 'nervue'
import { state } from './state'
import { actions } from './actions'

export const useFiltersStore = defineStore({
    id: 'filters',
    state,
    actions,
})
