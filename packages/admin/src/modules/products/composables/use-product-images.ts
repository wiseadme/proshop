import {
    computed,
    toRaw,
    unref,
} from 'vue'
import { IAsset } from '@proshop/types'
import { useProductModel } from '@modules/products/composables/use-product-model'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
import { CHANGES_SAVED, SAVING_ERROR } from '@shared/constants/notifications'

export const useProductImages = () => {
    const { model } = useProductModel()

    const {
        updateProductAssets,
        uploadProductImage,
        deleteProductImage,
        updateProductMainImage,
    } = useProductsService()

    const { notify } = useNotifications()

    const assets = computed<IAsset[]>(() => (unref(model)?.assets || []) as IAsset[])
    const mainImage = computed(() => unref(assets).find(it => it.main))

    const onLoadImage = async ([file]) => {
        try {
            await uploadProductImage(file)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const onDeleteImage = async (image: IAsset) => {
        try {
            await deleteProductImage(image)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const setAsMainImage = async (mainAsset: IAsset) => {
        const currentMainAsset = toRaw(unref(mainImage)!)

        mainAsset.main = true
        currentMainAsset.main = false

        try {
            await updateProductAssets([mainAsset, currentMainAsset])
            await updateProductMainImage(mainAsset)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const updateImagesOrders = async (assets: IAsset[]) => {
        try {
            await updateProductAssets(assets.map(it => ({
                id: it.id,
                order: it.order
            })))

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    return {
        assets,
        onLoadImage,
        onDeleteImage,
        setAsMainImage,
        updateImagesOrders,
    }
}
