import { defineStore } from 'nervue'

import { actions } from './actions'
import { state } from './state'

export const useVariantsStore = defineStore({
    id: 'variants',
    state,
    actions,
})
