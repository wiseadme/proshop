import { useGroupsStore } from '@modules/groups/store'
import { IGroup } from '@proshop/types'
import { computed } from 'vue'

export const useGroupsService = () => {
    const store = useGroupsStore()
    const {
        createGroup: createNewGroup,
        getGroups: getAllGroups
    } = store

    const readOnlyGroups = computed(() => store.groups)

    const createGroup = async (group: IGroup) => {
        try {
            return await createNewGroup(group)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const getGroups = async () => {
        try {
            return await getAllGroups()
        } catch (err) {
            return Promise.reject(err)
        }
    }

    return {
        readOnlyGroups,
        createGroup,
        getGroups,
    }
}
