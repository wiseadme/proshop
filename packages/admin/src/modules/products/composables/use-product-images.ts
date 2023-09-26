import { computed, unref } from 'vue'
import { IAsset } from '@proshop/types'
import { useProductModel } from '@modules/products/composables/use-product-model'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
import { CHANGES_SAVED, SAVING_ERROR } from '@shared/constants/notifications'

export const useProductImages = () => {
    const { model } = useProductModel()

    const {
        updateProductAssets,
        updateMainImageAsset,
        uploadProductImage,
        deleteProductImage,
    } = useProductsService()

    const {notify} = useNotifications()

    const assets = computed(() => unref(model)?.assets || [])

    const onLoadImage = async ([file]) => {
        const { assets } = unref(model)

        try {
            const asset = await uploadProductImage(file)

            assets.push(asset)
            await updateProductAssets({ assets })

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

    const setAsMainImage = async (imageAsset: IAsset) => {
        try {
            const asset = await updateMainImageAsset(imageAsset!)
            const { assets } = unref(model)

            assets.forEach((it) => it.main = it.id === asset.id)
            await updateProductAssets({ assets: assets })

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
    }
}
