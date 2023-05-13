import {
    computed,
    ref,
    unref
} from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useCategoriesStore } from '@modules/category/store'
import { useFilesService } from '@shared/services/files.service'
import { ICategory, Maybe } from '@ecommerce-platform/types'

export const useCategoriesService = createSharedComposable(() => {
    const _store = useCategoriesStore()
    const _filesService = useFilesService()

    const category = ref<Maybe<ICategory>>(null)

    const categories = computed<ICategory[]>(() => _store.categories || [])

    const setAsCurrent = (item: Maybe<ICategory>) => {
        category.value = item
    }

    const extractAssetIdFromFileName = (url) => {
        const urlParams = url.split('|')[0].split('/')

        return urlParams[urlParams.length - 1]
    }

    const createCategory = async (model) => {
        await _store.create(model)

        return getCategories()
    }

    const getCategories = () => {
        return _store.read()
    }

    const updateCategory = async (updates) => {
        const updated = await _store.update(updates)

        await getCategories()

        return updated
    }

    const deleteCategory = async (id) => {
        await _store.delete(id)

        return getCategories()
    }

    const uploadCategoryImage = async (file) => {
        const { formData, fileName } = _filesService.createFormData(file)
        const ownerId = unref(category)!._id
    
        const asset = await _filesService.uploadFile({ ownerId, fileName, formData })

        if (asset && asset.url) {
            category.value = await updateCategory({ _id: ownerId, image: asset.url })
        }
    }

    const deleteCategoryImage = async (url) => {
        const ownerId = unref(category)!._id
        const _id = extractAssetIdFromFileName(url)

        await _filesService.deleteFile({ ownerId, url, _id })

        category.value = await updateCategory({
            _id: ownerId,
            image: null
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
        deleteCategoryImage
    }
})
