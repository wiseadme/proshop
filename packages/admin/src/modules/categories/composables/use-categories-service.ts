import {
    computed,
    ref,
    unref,
} from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useCategoriesStore } from '@modules/categories/store'
import { useFilesService } from '@shared/services/files.service'
import {
    IAsset,
    ICategory,
    Maybe,
} from '@proshop/types'
import { getIds } from '@modules/products/helpers'

export const useCategoriesService = createSharedComposable(() => {
    const _store = useCategoriesStore()
    const _filesService = useFilesService()

    const category = ref<Maybe<ICategory>>(null)

    const categories = computed<ICategory[]>(() => _store.categories || [])

    const setAsCurrent = (item: Maybe<ICategory>) => {
        category.value = item
    }

    const createCategory = async (model: ICategory): Promise<ICategory> => {
        try {
            const category = await _store.createCategory(model)

            setAsCurrent(category)

            return category
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

            setAsCurrent(category)

            return category
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateCategory = async (updates: Record<string, any>): Promise<ICategory> => {
        updates.id = unref(category)!.id

        try {
            const updated = await _store.updateCategory(updates)

            setAsCurrent(updated)

            return updated
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const deleteCategory = async (id: string): Promise<void> => {
        try {
            await _store.deleteCategory(id)
            await getCategories()
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const saveFileAsset = async (file: File): Promise<IAsset> => {
        try {
            const { formData, fileName } = _filesService.createFormData(file)
            const ownerId = unref(category)!.id

            return await _filesService.uploadFile({
                ownerId,
                fileName,
                formData,
            })
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updateCategoryMainImage = async (asset: IAsset) => {
        const oldMain = unref(category)!.assets.find(it => it.main)!
        const newMain = unref(category)!.assets.find(it => it.id === asset.id)!

        if (oldMain) oldMain.main = false

        newMain.main = true

        try {
            await _filesService.updateMany(unref(category)!.assets.map(it => ({
                id: it.id,
                main: it.main
            })))

            return await updateCategory({id: newMain.ownerId, image: newMain.url})
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const uploadCategoryImage = async (file: File): Promise<ICategory> => {
        try {
            const asset = await saveFileAsset(file) as IAsset
            const assets = [...unref(category)!.assets, asset]

            if (assets.length === 1) {
                assets[0].main = true
                await _filesService.updateFile(asset)
            }

            const data = await updateCategory({
                id: unref(category)!.id,
                image: assets[0].url,
                assets: getIds(assets)
            })

            setAsCurrent(data)

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * TODO - реализовать главное изображение категории
     * и его изменение при удалении последней картинки
     */
    const deleteCategoryImage = async (asset: IAsset): Promise<ICategory> => {
        try {
            await _filesService.deleteFile({
                ownerId: asset.ownerId,
                url: asset.url,
                id: asset.id,
            })

            const assets = [...unref(category)!.assets.filter(it => it.id !== asset.id)]
            const hasLastImage = assets.length === 1

            if (hasLastImage) {
                assets[0].main = true
                await _filesService.updateFile(assets[0])
            }

            const updated = await updateCategory({
                id: asset.ownerId,
                assets: getIds(assets),
                image: hasLastImage ? assets[0].url : null
            })

            setAsCurrent(updated)

            return updated
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
        category,
        categories,
        setAsCurrent,
        getCategories,
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory,
        uploadCategoryImage,
        deleteCategoryImage,
        updateCategoryMainImage,
        updateCategoryImagesOrders,
    }
})
