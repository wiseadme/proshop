import { computed, unref } from 'vue'
import { useAttributesStore } from '@modules/attribute/store'
import { useFiltersStore } from '@modules/filter/store'

export const useFilterGroupService = () => {
    const _filtersStore = useFiltersStore()
    const _attributesStore = useAttributesStore()

    const { createFilterGroup, getFilterGroups } = _filtersStore

    const attributes = computed(() => _attributesStore.attributes)
    const filterGroups = computed(() => _filtersStore.filterGroups)

    const createFilterGroupItem = (filter) => {
        return createFilterGroup(filter)
    }

    const getFilterGroupAttributes = () => {
        if (unref(attributes)) return

        return _attributesStore.read()
    }

    const getFilterGroupItems = (params = {}) => {
        return getFilterGroups(params)
    }

    return {
        attributes,
        filterGroups,
        getFilterGroupAttributes,
        createFilterGroupItem,
        getFilterGroupItems,
    }
}
