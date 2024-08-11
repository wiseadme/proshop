import {
    DeepReadonly,
    Ref,
    computed
} from 'vue'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

import type {
    IAsset,
    ICategory,
    ICategoryParams
} from '@proshop-app/types'

import { useCategoriesStore } from '@modules/categories/store'
import { useFilesService } from '@shared/services/files.service'

export const useCategoriesService = createSharedComposable(() => {
    const _store = useCategoriesStore()
    const _filesService = useFilesService()

    const _categories = computed<ICategory[]>(() => _store.categories || [])

    const createCategory = async (model: ICategory): Promise<ICategory> => {
        try {
            return await _store.createCategory(model)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const getCategories = async (params = {}): Promise<ICategory[]> => {
        try {
            return await _store.getCategories(params)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const getCategory = async (id: string): Promise<ICategory> => {
        try {
            const [category] = await _store.getCategory(id)

            return category
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateCategory = async (updates: Partial<ICategoryParams>): Promise<ICategory> => {
        try {
            return await _store.updateCategory(updates)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const deleteCategory = async (id: string): Promise<void> => {
        try {
            await _store.deleteCategory(id)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateCategoryImagesOrders = async (assets: IAsset[]): Promise<boolean> => {
        try {
            await _filesService.updateMany(assets)

            return true
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
        updateCategoryImagesOrders,
    }
})
