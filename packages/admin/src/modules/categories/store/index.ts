import { defineStore } from 'nervue'

import { actions } from '@modules/categories/store/actions'
import { state } from '@modules/categories/store/state'

export const useCategoriesStore = defineStore({
    id: 'categories',
    state,
    actions,
}
)
