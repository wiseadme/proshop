// unref,
import { computed } from 'vue'
import { useFilterItemsStore } from '@modules/filters/store/filter-items'
import { IFilterItem } from '@proshop/types'
import { createSharedComposable } from '@shared/features/create-shared-composable'

export const useFilterItemsService = createSharedComposable(() => {
    const _store = useFilterItemsStore()
    const { createFilter, getFilters, deleteFilter, updateFilter } = _store

    const filterItems = computed<IFilterItem[]>(() => _store.filterItems)

    const createFilterItem = (filter: IFilterItem) => createFilter(filter)
    const deleteFilterItem = (filter: IFilterItem) => deleteFilter(filter.id)
    const getFilterItems = (params = {}) => getFilters(params)

    const updateFilterItem = async (updates: Partial<IFilterItem>): Promise<IFilterItem> => {
        try {
            return await updateFilter(updates)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    return {
        filterItems,
        deleteFilterItem,
        getFilterItems,
        updateFilterItem,
        createFilterItem,
    }
})
