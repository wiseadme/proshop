import {
    computed,
    ref,
    unref,
} from 'vue'


import { createSharedComposable } from '@shared/composables/features/create-shared-composable'


import { Category } from '@modules/categories/model/category.model'

import type { ICategory } from '@proshop-app/types'

import { clone } from '@shared/helpers'

export const useCategoryModel = createSharedComposable(() => {
    const model = ref<ICategory>(Category.create())

    const isEditMode = computed(() => Boolean(unref(model).id))

    const setCategoryModel = (value?: ICategory) => {
        model.value = value ? Category.create(clone(value)) : Category.create()
    }

    return {
        model,
        isEditMode,
        setCategoryModel,
    }
})
