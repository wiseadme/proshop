import { defineStore } from 'nervue'

import { actions } from '@modules/products/store/actions'
import { guards } from '@modules/products/store/guards'
import { state } from '@modules/products/store/state'

export const useProductStore = defineStore({
    id: 'product',
    state,
    guards,
    actions,
})
