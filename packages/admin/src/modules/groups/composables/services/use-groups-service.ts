import {
    DeepReadonly,
    Ref,
    ref,
} from 'vue'
import { IGroup, IVariant } from '@proshop/types'
import { useGroupsRepository } from '@modules/groups/repository/groups.repository'
import { useLogger } from '@shared/utils/logger'
import { createSharedComposable } from '@shared/features/create-shared-composable'

export const useGroupsService = createSharedComposable(() => {
    const repository = useGroupsRepository()
    const { logError } = useLogger()

    const _groups = ref<IGroup[]>([])

    const createGroup = async (group: IGroup) => {
        try {
            const { data } = await repository.createGroup({
                ...group,
                variant: (group.variant as IVariant).id
            })

            _groups.value.push(data.data)

            return data.data
        } catch (err) {
            logError('Groups Service: group creating failed', err)

            return Promise.reject(err)
        }
    }

    const getGroups = async (params = {}) => {
        try {
            const { data } = await repository.getGroups(params)

            _groups.value = data.data
        } catch (err) {
            logError('Groups Service: groups fetching failed', err)

            return Promise.reject(err)
        }
    }

    const deleteGroup = async (id: string) => {
        try {
            await repository.deleteGroup(id)

            _groups.value = _groups.value.filter(it => it.id !== id)
        } catch (err) {
            logError('Groups Service: group deleting failed', err)

            return Promise.reject(err)
        }
    }

    const updateGroup = async (updates: Partial<IGroup>): Promise<IGroup> => {
        try {
            const { data } = await repository.updateGroup(updates)

            _groups.value = _groups.value.reduce((acc, it) => {
                acc.push(it.id === updates.id ? data.data : it)

                return acc
            }, [] as IGroup[])

            return data.data
        } catch (err) {
            logError('Groups Service: group updating failed', err)

            return Promise.reject(err)
        }
    }

    return {
        readOnlyGroups: _groups as Ref<DeepReadonly<IGroup>[]>,
        createGroup,
        getGroups,
        deleteGroup,
        updateGroup,
    }
})
