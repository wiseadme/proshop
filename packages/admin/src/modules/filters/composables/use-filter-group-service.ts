import {
    ComputedRef,
    computed,
    unref
} from 'vue'

import type { IAttribute, IFilterGroup } from '@proshop/types'

import { useAttributesStore } from '@modules/attributes/store'
import { useFilterGroupsStore } from '@modules/filters/store/filter-groups'

interface IUseFilterGroupService {
    attributes: ComputedRef<IAttribute[]>
    filterGroups: ComputedRef<IFilterGroup[]>

    getFilterGroupAttributes(): Promise<void>

    createFilterGroup(filter: IFilterGroup): Promise<IFilterGroup>

    getFilterGroups(params?: Partial<IFilterGroup>): Promise<IFilterGroup[]>

    updateFilterGroup(updates: Partial<IFilterGroup>): Promise<IFilterGroup>

    deleteFilterGroup(id: string): Promise<boolean>
}

export const useFilterGroupService = (): IUseFilterGroupService => {
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

    const getFilterGroupAttributes = async () => {
        if (unref(attributes)) return

        await _attributesStore.read()
    }

    return {
        attributes,
        filterGroups,
        getFilterGroupAttributes,
        createFilterGroup,
        getFilterGroups,
        updateFilterGroup,
        deleteFilterGroup,
    }
}
