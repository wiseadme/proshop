import { defineStore } from 'nervue'
import { state } from './state'
import { actions } from './actions'

export const useMetaTagsStore = defineStore({
    id: 'metaTags',
    state,
    actions
})
