import { defineStore } from 'nervue'
import { actions } from '@modules/groups/store/actions'
import { state } from '@modules/groups/store/state'

export const useGroupsStore = defineStore({
    id: 'groups',
    state,
    actions,
})
