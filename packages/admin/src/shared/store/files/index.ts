import { defineStore } from 'nervue'

import { actions } from './actions'

const id = 'FILES'

export const useFilesStore = defineStore({
    id,
    actions
})
