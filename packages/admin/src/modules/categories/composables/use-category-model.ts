import {
    computed,
    ref,
    unref,
    watch,
} from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

import { useCategoriesService } from '@modules/categories/composables/use-categories-service'

import { Category } from '@modules/categories/model/category.model'

import { ICategory } from '@proshop/types'

import { clone } from '@shared/helpers'

export const useCategoryModel = createSharedComposable(() => {
    const { category } = useCategoriesService()

    const model = ref<ICategory>(Category.create())

    const isEditMode = computed(() => Boolean(unref(model).id))

    const setCategoryModel = (value: Maybe<ICategory>) => {
        model.value = value ? Category.create(clone(value)) : Category.create()
    }

    watch(category, setCategoryModel, { immediate: true })

    return {
        model,
        isEditMode,
        setCategoryModel,
    }
})
