import {
    DeepReadonly,
    Ref,
    ref,
    unref
} from 'vue'

import {
    useFilterGroupsRepository
} from '@modules/filters/composables/repository/use-filter-groups-repository'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

import { useLogger } from '@shared/utils/logger'

import type { IFilterGroup } from '@proshop-app/types'


interface IUseFilterGroupService {
    filterGroups: Ref<DeepReadonly<IFilterGroup>[]>

    createFilterGroup(filter: IFilterGroup): Promise<IFilterGroup>

    getFilterGroups(params?: Partial<IFilterGroup>): Promise<IFilterGroup[]>

    updateFilterGroup(updates: Partial<IFilterGroup>): Promise<IFilterGroup>

    deleteFilterGroup(id: string): Promise<boolean>

    cancelRequests(reason?: string): void
}

export const useFilterGroupService = createSharedComposable((): IUseFilterGroupService => {
    const repository = useFilterGroupsRepository()
    const { logError } = useLogger()

    const _filterGroups = ref<IFilterGroup[]>([])

    const createFilterGroup = async (group: IFilterGroup): Promise<IFilterGroup> => {
        try {
            const { data } = await repository.createFilterGroup(group)

            _filterGroups.value.push(data)

            return data
        } catch (err) {
            logError('Filter Groups Service: group creating failed', err)

            return Promise.reject(err)
        }
    }

    const getFilterGroups = async (params?: Partial<IFilterGroup>): Promise<IFilterGroup[]> => {
        try {
            const { data } = await repository.getFilterGroups(params)

            _filterGroups.value = data

            return data
        } catch (err) {
            logError('Filter Groups Service: groups loading failed', err)

            return Promise.reject(err)
        }
    }

    const updateFilterGroup = async (updates: Partial<IFilterGroup>): Promise<IFilterGroup> => {
        try {
            const { data } = await repository.updateFilterGroup(updates)

            _filterGroups.value = unref(_filterGroups).map(group => {
                return group.id === updates.id ? data : group
            })

            return data
        } catch (err) {
            logError('Filter Groups Service: group updating failed', err)

            return Promise.reject(err)
        }
    }

    const deleteFilterGroup = async (id: string): Promise<boolean> => {
        try {
            const { data } = await repository.deleteFilterGroup(id)

            _filterGroups.value = unref(_filterGroups).filter(item => item.id !== id)

            return data
        } catch (err) {
            logError('Filter Groups Service: group deleting failed', err)

            return Promise.reject(err)
        }
    }

    return {
        filterGroups: _filterGroups as Ref<DeepReadonly<IFilterGroup>[]>,
        createFilterGroup,
        getFilterGroups,
        updateFilterGroup,
        deleteFilterGroup,
        cancelRequests: repository.cancel
    }
})
