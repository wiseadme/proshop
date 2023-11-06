import { createSharedComposable } from '@shared/features/create-shared-composable'
import { ref } from 'vue'
import { FilterItem } from '@modules/filters/model/filterItem.model'
import { IFilterItem } from '@proshop/types'

export const useFilterItemModel = createSharedComposable(() => {
    const model = ref(FilterItem.create())
    const isEditMode = ref(false)

    const setModel = (filter: IFilterItem) => model.value = FilterItem.create(filter)

    return {
        model,
        isEditMode,
        setModel
    }
})
