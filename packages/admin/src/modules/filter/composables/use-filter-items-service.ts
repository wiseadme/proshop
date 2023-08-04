import { useFilterGroupsStore } from '@modules/filter/store/filter-groups'
import { computed } from 'vue'
import { useFilterItemsStore } from '@modules/filter/store/filter-items'
import { IFilterItem } from '@proshop/types'

export const useFilterItemsService = () => {
    const _filterItemsStore = useFilterItemsStore()
    const _filterGroupsStore = useFilterGroupsStore()

    const { getFilterGroups } = _filterGroupsStore
    const { createFilter, getFilters, deleteFilter } = _filterItemsStore

    const filterGroups = computed(() => _filterGroupsStore.filterGroups)
    const filterItems = computed<IFilterItem[]>(() => _filterItemsStore.filterItems)

    const createFilterItem = (filter: IFilterItem) => createFilter(filter)
    const deleteFilterItem = (filter: IFilterItem) => deleteFilter(filter.id)
    const getFilterItems = (params = {}) => getFilters(params)

    return {
        filterGroups,
        filterItems,
        getFilterGroups,
        deleteFilterItem,
        getFilterItems,
        createFilterItem,
    }
}
