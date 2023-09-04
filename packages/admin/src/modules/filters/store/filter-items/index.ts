import { defineStore } from 'nervue'
import { actions } from './actions'
import { state } from './state'

export const useFilterItemsStore = defineStore({
    id: 'filter-items',
    state,
    actions
})
