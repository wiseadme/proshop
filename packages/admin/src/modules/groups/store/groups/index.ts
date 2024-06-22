import { defineStore } from 'nervue'
import { actions } from '@modules/groups/store/groups/actions.ts'
import { state } from '@modules/groups/store/groups/state.ts'

export const useGroupsStore = defineStore({
    id: 'groups',
    state,
    actions,
})
