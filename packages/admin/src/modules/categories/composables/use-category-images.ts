import { computed, unref } from 'vue'

import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
import { useCategoryModel } from '@modules/categories/composables/use-category-model'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import { IAsset } from '@proshop/types'

import {
    CATEGORY_IMAGE_DELETED,
    CATEGORY_IMAGE_SAVED,
} from '@modules/categories/constants/notifications'
import { CHANGES_SAVED, SAVING_ERROR } from '@shared/constants/notifications'


export const useCategoryImages = () => {
    const {
        category,
        updateCategoryImagesOrders,
        updateCategoryMainImage,
        uploadCategoryImage,
        deleteCategoryImage,
    } = useCategoriesService()

    const { model } = useCategoryModel()
    const { notify } = useNotifications()

    const mainImage = computed(() => (unref(category)?.assets as IAsset[]).find(it => it.main))

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
            await uploadCategoryImage(file)
            unref(model).image = unref(category)!.image

            notify(CATEGORY_IMAGE_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const onDeleteCategoryImage = async (asset: IAsset) => {
        try {
            await deleteCategoryImage(asset)

            notify(CATEGORY_IMAGE_DELETED)
        } catch {
            notify(SAVING_ERROR)
        }
    }

    const onUpdateMainImage = async (asset: IAsset) => {
        try {
            await updateCategoryMainImage(asset)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    return {
        mainImage,
        onUpdateImagesOrders,
        onUploadCategoryImage,
        onDeleteCategoryImage,
        onUpdateMainImage,
    }
}
