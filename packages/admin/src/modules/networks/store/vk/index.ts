import { defineStore } from 'nervue'
import { actions } from './actions'
import { state } from './state'

export const useVKStore = defineStore({
    id: 'networks/vk',
    state,
    actions,
})
