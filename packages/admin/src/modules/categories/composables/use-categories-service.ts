import {
    DeepReadonly,
    Ref,
    ref,
    unref
} from 'vue'

import {
    useCategoryRepository
} from '@modules/categories/composables/repository/use-category-repository'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

import type { ICategory, ICategoryParams } from '@proshop-app/types'

export const useCategoriesService = createSharedComposable(() => {
    const repository = useCategoryRepository()
    const _categories = ref<ICategory[]>([])

    const createCategory = async (model: ICategory): Promise<ICategory> => {
        try {
            const { data } = await repository.createCategory(model)
            _categories.value.push(data)

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const getCategories = async (params = {}): Promise<ICategory[]> => {
        try {
            const { data } = await repository.getCategories(params)

            _categories.value = data

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const getCategory = async (id: string): Promise<ICategory> => {
        try {
            const { data } = await repository.getCategories({ id })
            const [category] = data

            return category
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateCategory = async (updates: Partial<ICategoryParams>): Promise<ICategory> => {
        try {
            const { data } = await repository.updateCategory(updates)

            _categories.value = unref(_categories).map(it => it.id === updates.id ? data : it)

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const deleteCategory = async (id: string): Promise<boolean> => {
        try {
            const {data} = await repository.deleteCategory(id)

            _categories.value = unref(_categories).filter(it => it.id !== id)

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    }

    return {
        categories: _categories as DeepReadonly<Ref<ICategory[]>>,
        getCategories,
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory,
    }
})
