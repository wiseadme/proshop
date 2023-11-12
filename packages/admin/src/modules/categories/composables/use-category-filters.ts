import {
    ref,
    unref,
    watch,
} from 'vue'
import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'
import { IFilterGroup } from '@proshop/types'
import { useCategoryModel } from '@modules/categories/composables/use-category-model'

export const useCategoryFilters = () => {
    const { filterGroups, getFilterGroupItems } = useFilterGroupService()
    const { model } = useCategoryModel()

    const usedFilterGroups = ref<IFilterGroup[]>([])
    const availableFilterGroups = ref<IFilterGroup[]>([])

    watch(() => [unref(model).filters, unref(filterGroups)], () => {
        const map = (unref(model).filters as IFilterGroup[])?.reduce((acc, it) => {
            acc[it.id] = true

            return acc
        }, {}) || {}

        availableFilterGroups.value = unref(filterGroups)?.filter(it => !map[it.id]) || []
        usedFilterGroups.value = unref(filterGroups)?.filter(it => map[it.id]) || []

    }, { immediate: true })

    return {
        availableFilterGroups,
        usedFilterGroups,
        getFilterGroupItems,
    }
}
