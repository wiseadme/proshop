import { defineStore } from 'nervue'

import { actions } from './actions'
import { state } from './state'

export const useUnitsStore = defineStore({
    id: 'units',
    state,
    actions
})
