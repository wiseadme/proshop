import { ref } from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

import { FilterItem } from '@modules/filters/model/filterItem.model'

import type { IFilterItem } from '@proshop-app/types'

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
