import { defineStore } from 'nervue'

import { actions } from './actions'
import { state } from './state'

export const useOrdersStore = defineStore({
    id: 'orders',
    state,
    actions
})
