import { defineStore } from 'pinia'
import { state } from '@modules/category/store/state'
import { actions } from '@modules/category/store/actions'

export const useCategoryStore = defineStore<string, ICategoryState, {}, ICategoryActions>(
  'category',
  {
    state,
    actions,
  }
)
