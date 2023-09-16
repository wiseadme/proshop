import { defineStore } from 'nervue'
import { state } from '@modules/attributes/store/state'
import { actions } from '@modules/attributes/store/actions'
import { guards } from '@modules/attributes/store/guards'

export const useAttributesStore = defineStore({
    id: 'attributes',
    state,
    guards,
    actions,
})
