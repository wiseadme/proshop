import { defineStore } from 'nervue'

import { actions } from './actions'
import { state } from './state'

export const useFilterGroupsStore = defineStore({
    id: 'filterGroups',
    state,
    actions,
})
