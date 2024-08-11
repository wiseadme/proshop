import {
    DeepReadonly,
    Ref,
    ref,
} from 'vue'

import { useGroupsRepository } from '@modules/groups/composables/repository/use-groups-repository'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'


import { useLogger } from '@shared/utils/logger'

import type { IGroup, IVariant } from '@proshop-app/types'

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

            _groups.value.push(data)

            return data
        } catch (err) {
            logError('Groups Service: group creating failed', err)

            return Promise.reject(err)
        }
    }

    const getGroups = async (params = {}) => {
        try {
            const { data } = await repository.getGroups(params)

            _groups.value = data
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
                acc.push(it.id === updates.id ? data : it)

                return acc
            }, [] as IGroup[])

            return data
        } catch (err) {
            logError('Groups Service: group updating failed', err)

            return Promise.reject(err)
        }
    }

    return {
        groups: _groups as Ref<DeepReadonly<IGroup>[]>,
        createGroup,
        getGroups,
        deleteGroup,
        updateGroup,
        cancelRequests: repository.cancel
    }
})
