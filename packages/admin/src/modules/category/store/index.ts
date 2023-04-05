import { defineStore } from 'nervue'
import { state } from '@modules/category/store/state'
import { actions } from '@modules/category/store/actions'

export const useCategoriesStore = defineStore({
    id: 'categories',
    state,
    actions,
  }
)
