import { DeepReadonly, computed } from 'vue'
import { useGroupsStore } from '@modules/groups/store/groups'
import { IGroup, IVariant } from '@proshop/types'

export const useGroupsService = () => {
    const store = useGroupsStore()
    const {
        createGroup: createNewGroup,
        getGroups: getAllGroups,
        deleteGroup: deleteGroupItem,
        updateGroup: updateGroupItem
    } = store

    const readOnlyGroups = computed<DeepReadonly<IGroup>[]>(() => store.groups ?? [])

    const createGroup = async (group: IGroup) => {
        try {
            return await createNewGroup({
                ...group,
                variant: (group.variant as IVariant).id
            })
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

    const deleteGroup = async (id: string) => {
        try {
            return await deleteGroupItem(id)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateGroup = async (updates: Partial<IGroup>): Promise<IGroup> => {
        try {
            return await updateGroupItem(updates)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    return {
        readOnlyGroups,
        createGroup,
        getGroups,
        deleteGroup,
        updateGroup,
    }
}