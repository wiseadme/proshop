import { defineStore } from 'nervue'

import { actions } from './actions'
import { state } from './state'

export const useMetaTagsStore = defineStore({
    id: 'metaTags',
    state,
    actions
})
