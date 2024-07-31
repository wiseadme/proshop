import {
    DeepReadonly,
    Ref,
    ref,
    unref
} from 'vue'

import {
    useFilterItemsRepository
} from '@modules/filters/composables/repository/use-filter-items-repository'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

import { useLogger } from '@shared/utils/logger'

import type { IFilterItem } from '@proshop-app/types'

export const useFilterItemsService = createSharedComposable(() => {
    const repository = useFilterItemsRepository()
    const { logError } = useLogger()

    const _filterItems = ref<IFilterItem[]>([])

    const createFilterItem = async (filter: IFilterItem) => {
        try {
            const { data } = await repository.createFilterItem(filter)

            unref(_filterItems).push(data)
        } catch (err) {
            logError('Filter Items Service: filter creating failed', err)

            return Promise.reject(err)
        }
    }

    const getFilterItems = async (params = {}) => {
        try {
            const { data } = await repository.getFilterItems(params)

            _filterItems.value = data
        } catch (err) {
            logError('Filter Items Service: filter loading failed', err)

            return Promise.reject(err)
        }
    }

    const updateFilterItem = async (updates: Partial<IFilterItem>) => {
        try {
            const { data } = await repository.updateFilterItem(updates)

            _filterItems.value = unref(_filterItems).map(it => it.id === updates.id ? data : it)

        } catch (err) {
            logError('Filter Items Service: filter updating failed', err)

            return Promise.reject(err)
        }
    }

    const deleteFilterItem = async (id: string) => {
        try {
            await repository.deleteFilterItem(id)

            _filterItems.value = unref(_filterItems).filter(it => it.id !== id)
        } catch (err) {
            logError('Filter Items Service: filter deleting failed', err)

            return Promise.reject(err)
        }
    }

    return {
        filterItems: _filterItems as Ref<DeepReadonly<IFilterItem>[]>,
        deleteFilterItem,
        getFilterItems,
        updateFilterItem,
        createFilterItem,
        cancelRequests: repository.cancel
    }
})
