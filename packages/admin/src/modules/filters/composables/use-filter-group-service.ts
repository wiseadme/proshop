import { computed, unref } from 'vue'
import { useAttributesStore } from '@modules/attributes/store'
import { useFilterGroupsStore } from '@modules/filters/store/filter-groups'
import { IFilterGroup } from '@proshop/types'

export const useFilterGroupService = () => {
    const _filterGroupsStore = useFilterGroupsStore()
    const _attributesStore = useAttributesStore()

    const { createFilterGroup, getFilterGroups, deleteFilterGroup } = _filterGroupsStore

    const attributes = computed(() => _attributesStore.attributes)
    const filterGroups = computed(() => _filterGroupsStore.filterGroups)

    const getFilterGroupAttributes = () => {
        if (unref(attributes)) return

        return _attributesStore.read()
    }

    const createFilterGroupItem = (filterGroup: IFilterGroup) => createFilterGroup(filterGroup)
    const getFilterGroupItems = (params = {}) => getFilterGroups(params)
    const deleteFilterGroupItem = (id: string) => deleteFilterGroup(id)

    return {
        attributes,
        filterGroups,
        getFilterGroupAttributes,
        createFilterGroupItem,
        getFilterGroupItems,
        deleteFilterGroupItem,
    }
}
