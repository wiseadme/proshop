import { defineStore } from 'nervue'
import { state } from './state'
import { actions } from './actions'

export const useFilterGroupsStore = defineStore({
    id: 'filter-groups',
    state,
    actions,
})
