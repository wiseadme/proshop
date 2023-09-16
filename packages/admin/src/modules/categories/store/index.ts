import { defineStore } from 'nervue'
import { state } from '@modules/categories/store/state'
import { actions } from '@modules/categories/store/actions'

export const useCategoriesStore = defineStore({
    id: 'categories',
    state,
    actions,
}
)
