import {
    computed,
    ref,
    unref,
} from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useCategoriesStore } from '@modules/categories/store'
import { useFilesService } from '@shared/services/files.service'
import { ICategory, Maybe } from '@proshop/types'

export const useCategoriesService = createSharedComposable(() => {
    const _store = useCategoriesStore()
    const _filesService = useFilesService()

    const category = ref<Maybe<ICategory>>(null)

    const categories = computed<ICategory[]>(() => _store.categories || [])

    const setAsCurrent = (item: Maybe<ICategory>) => {
        category.value = item
    }

    const extractAssetIdFromFileName = (url: string): string => {
        const urlParams = url.split('|')[0].split('/')

        return urlParams[urlParams.length - 1]
    }

    const createCategory = async (model: ICategory): Promise<ICategory> => {
        try {
            return await _store.create(model)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const getCategories = async (params = {}): Promise<ICategory[]> => {
        try {
            return await _store.read(params)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateCategory = async (updates: Partial<ICategory>): Promise<ICategory> => {
        try {
            return await _store.update(updates)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const deleteCategory = async (id: string) => {
        await _store.delete(id)

        return getCategories()
    }

    const uploadCategoryImage = async (file: File) => {
        const { formData, fileName } = _filesService.createFormData(file)
        const ownerId = unref(category)!.id

        const asset = await _filesService.uploadFile({ ownerId, fileName, formData })

        if (asset && asset.url) {
            category.value = await updateCategory({ id: ownerId, image: asset.url })
        }
    }

    const deleteCategoryImage = async (url) => {
        const ownerId = unref(category)!.id
        const id = extractAssetIdFromFileName(url)

        await _filesService.deleteFile({ ownerId, url, id })

        category.value = await updateCategory({
            id: ownerId,
            image: null,
        })
    }

    return {
        category,
        categories,
        setAsCurrent,
        getCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        uploadCategoryImage,
        deleteCategoryImage,
    }
})
