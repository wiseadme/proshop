import { defineStore } from 'nervue'
import { state } from './state'
import { actions } from './actions'
import { expose } from '@modules/unit/store/expose'

const id = 'UNIT'

export const useUnitStore = defineStore<string, IUnitState, {}, {}, IUnitActions>({
  id,
  state,
  expose,
  actions
})
