import { computed, unref } from 'vue'

import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
import { useCategoryModel } from '@modules/categories/composables/use-category-model'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import type { IAsset } from '@proshop-app/types'

import {
    CATEGORY_IMAGE_DELETED,
    CATEGORY_IMAGE_SAVED,
} from '@modules/categories/constants/notifications'
import { getIds } from '@modules/products/helpers'
import { CHANGES_SAVED, SAVING_ERROR } from '@shared/constants/notifications'
import { useFilesService } from '@shared/services/files.service'


export const useCategoryImages = () => {
    const {
        updateCategoryImagesOrders,
        updateCategory,
    } = useCategoriesService()

    const filesService = useFilesService()

    const { model } = useCategoryModel()
    const { notify } = useNotifications()

    const assets = computed(() => unref(model).assets ?? [])

    const onUpdateImagesOrders = async (assets: IAsset[]) => {
        try {
            await updateCategoryImagesOrders(assets)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const onUploadCategoryImage = async (file: File) => {
        try {
            const { formData, fileName } = filesService.createFormData(file)

            const asset = await filesService.uploadFile({
                fileName,
                formData,
                ownerId: unref(model).id
            })

            unref(model).assets.push(asset)

            await updateCategory({
                id: unref(model).id,
                image: unref(model).assets[0].url,
                assets: getIds(unref(model).assets)
            })

            notify(CATEGORY_IMAGE_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const onDeleteCategoryImage = async (asset: IAsset) => {
        try {
            await filesService.deleteFile(asset)

            unref(model).assets = unref(assets).filter(it => it.id !== asset.id)

            await updateCategory({
                id: asset.ownerId,
                assets: getIds(unref(assets)),
            })

            notify(CATEGORY_IMAGE_DELETED)
        } catch {
            notify(SAVING_ERROR)
        }
    }

    const onUpdateMainImage = async (asset: IAsset) => {
        try {
            await updateCategory({
                id: asset.ownerId,
                image: asset.url,
            })

            unref(model).image = asset.url

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    return {
        assets,
        onUpdateImagesOrders,
        onUploadCategoryImage,
        onDeleteCategoryImage,
        onUpdateMainImage,
    }
}
