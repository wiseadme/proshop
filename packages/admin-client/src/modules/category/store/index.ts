import { defineStore } from 'nervue'
import { state } from '@modules/category/store/state'
import { actions } from '@modules/category/store/actions'
import { expose } from '@modules/category/store/expose'

const id = 'CATEGORY'

export const useCategoryStore = defineStore<string, ICategoryState, {}, {}, ICategoryActions>({
    id,
    state,
    actions,
    expose
  }
)
