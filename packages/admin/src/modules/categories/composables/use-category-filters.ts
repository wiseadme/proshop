import {
    ref,
    unref,
    watch,
} from 'vue'
import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'
import { IFilterGroup } from '@proshop/types'
import { useCategoryModel } from '@modules/categories/composables/use-category-model'
import { useCategoriesService } from '@modules/categories/composables/use-categories-service'

export const useCategoryFilters = () => {
    const { filterGroups, getFilterGroupItems } = useFilterGroupService()
    const { model } = useCategoryModel()
    const {updateCategory} = useCategoriesService()

    const availableFilterGroups = ref<IFilterGroup[]>([])

    const onUpdateFilters = async () => {
        try {
            await updateCategory({
                id: unref(model).id,
                filters: unref(model).filters.map(f => (f as IFilterGroup).id)
            })
        } catch (err) {

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
        getFilterGroupItems,
        onUpdateFilters,
    }
}
