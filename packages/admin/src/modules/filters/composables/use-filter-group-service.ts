import { computed, unref } from 'vue'

import { IAttribute, IFilterGroup } from '@proshop/types'

import { useAttributesStore } from '@modules/attributes/store'
import { useFilterGroupsStore } from '@modules/filters/store/filter-groups'

export const useFilterGroupService = () => {
    const _filterGroupsStore = useFilterGroupsStore()
    const _attributesStore = useAttributesStore()

    const {
        createFilterGroup,
        getFilterGroups,
        deleteFilterGroup,
        updateFilterGroup
    } = _filterGroupsStore

    const attributes = computed<IAttribute[]>(() => _attributesStore.attributes!)
    const filterGroups = computed<IFilterGroup[]>(() => _filterGroupsStore.filterGroups)

    const getFilterGroupAttributes = () => {
        if (unref(attributes)) return

        return _attributesStore.read()
    }

    const createFilterGroupItem = (filterGroup: IFilterGroup) => createFilterGroup(filterGroup)

    const getFilterGroupItems = (params = {}) => getFilterGroups(params)

    const deleteFilterGroupItem = (id: string) => deleteFilterGroup(id)
    const updateFilterGroupItem = (updates: Partial<IFilterGroup>) => updateFilterGroup(updates)

    return {
        attributes,
        filterGroups,
        getFilterGroupAttributes,
        createFilterGroupItem,
        getFilterGroupItems,
        updateFilterGroupItem,
        deleteFilterGroupItem,
    }
}
