import { defineStore } from 'nervue'
import { actions } from '@modules/groups/store/actions.ts'
import { state } from '@modules/groups/store/state.ts'

export const useGroupsStore = defineStore({
    id: 'groups',
    state,
    actions,
})
