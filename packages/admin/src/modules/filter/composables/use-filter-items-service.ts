import { computed } from 'vue'
import { useFilterItemsStore } from '@modules/filter/store/filter-items'
import { IFilterItem } from '@proshop/types'

export const useFilterItemsService = () => {
    const _store = useFilterItemsStore()

    const { createFilter, getFilters, deleteFilter } = _store

    const filterItems = computed<IFilterItem[]>(() => _store.filterItems)

    const createFilterItem = (filter: IFilterItem) => createFilter(filter)
    const deleteFilterItem = (filter: IFilterItem) => deleteFilter(filter.id)
    const getFilterItems = (params = {}) => getFilters(params)

    return {
        filterItems,
        deleteFilterItem,
        getFilterItems,
        createFilterItem,
    }
}
