import {
    computed,
    ref,
    unref,
} from 'vue'
import { useFilterItemsStore } from '@modules/filters/store/filter-items'
import { IFilterItem } from '@proshop/types'

export const useFilterItemsService = () => {
    const _store = useFilterItemsStore()
    const filterItem = ref<Maybe<IFilterItem>>(null)

    const { createFilter, getFilters, deleteFilter, updateFilter } = _store

    const setForEdit = (filter) => filterItem.value = filter

    const filterItems = computed<IFilterItem[]>(() => _store.filterItems)
    const createFilterItem = (filter: IFilterItem) => createFilter(filter)
    const deleteFilterItem = (filter: IFilterItem) => deleteFilter(filter.id)
    const getFilterItems = (params = {}) => getFilters(params)

    const updateFilterItem = async (updates) => {
        updates.id = unref(filterItem)!.id

        try {
            return await updateFilter(updates)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    return {
        filterItems,
        setForEdit,
        deleteFilterItem,
        getFilterItems,
        updateFilterItem,
        createFilterItem,
    }
}
