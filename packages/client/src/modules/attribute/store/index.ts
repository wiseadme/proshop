import { defineStore } from 'pinia'
import { actions } from '@modules/attribute/store/actions'
import { state } from '@modules/attribute/store/state'

export const useAttributeStore = defineStore<string, IAttributeState, {}, IAttributesActions>('attribute', {
  state,
  actions
})
