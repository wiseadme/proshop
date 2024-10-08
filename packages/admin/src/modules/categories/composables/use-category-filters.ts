import {
    computed,
    ref,
    unref,
    watch,
} from 'vue'

import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
import { useCategoryModel } from '@modules/categories/composables/use-category-model'
import {
    useFilterGroupService
} from '@modules/filters/composables/services/use-filter-group-service'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import { IFilterGroup } from '@proshop-app/types'


import {
    CATEGORY_FILTERS_UPDATED,
    CATEGORY_SAVING_ERROR
} from '@modules/categories/constants/notifications'

export const useCategoryFilters = () => {
    const { filterGroups, getFilterGroups } = useFilterGroupService()
    const { model } = useCategoryModel()
    const { updateCategory } = useCategoriesService()
    const { notify } = useNotifications()

    const availableFilterGroups = ref<IFilterGroup[]>([])

    const categoryFilters = computed<string[]>(() => unref(model).filters.map(f => (f as IFilterGroup).id) ?? [])

    const onUpdateFilters = async () => {
        try {
            await updateCategory({ id: unref(model).id, filters: unref(categoryFilters) })

            notify(CATEGORY_FILTERS_UPDATED)
        } catch (err) {
            notify(CATEGORY_SAVING_ERROR)
        }
    }

    watch(() => unref(model).filters, to => {
        console.log(to)
    })

    watch(() => [unref(model).filters, unref(filterGroups)], () => {
        const map = (unref(model).filters as IFilterGroup[])?.reduce((acc, it) => {
            acc[it.id] = true

            return acc
        }, {}) || {}

        availableFilterGroups.value = unref(filterGroups)?.filter(it => !map[it.id]) || []
    }, { immediate: true })

    return {
        availableFilterGroups,
        getFilterGroups,
        onUpdateFilters,
    }
}
