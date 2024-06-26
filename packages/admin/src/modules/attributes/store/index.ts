import { defineStore } from 'nervue'

import { actions } from '@modules/attributes/store/actions'
import { guards } from '@modules/attributes/store/guards'
import { state } from '@modules/attributes/store/state'

export const useAttributesStore = defineStore({
    id: 'attributes',
    state,
    guards,
    actions,
})
