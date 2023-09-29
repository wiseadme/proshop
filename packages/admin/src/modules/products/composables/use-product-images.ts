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
        updateProductImages,
        uploadProductImage,
        deleteProductImage,
    } = useProductsService()

    const { notify } = useNotifications()

    const assets = computed<IAsset[]>(() => (unref(model)?.assets || []) as IAsset[])
    const mainAsset = computed(() => unref(assets).find(it => it.main))

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

    const setAsMainImage = async (imageAsset: IAsset) => {
        const currentMainAsset = toRaw(unref(mainAsset)!)

        imageAsset.main = true
        currentMainAsset.main = false

        try {
            await updateProductImages([
                currentMainAsset,
                imageAsset,
            ])

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const updateImagesOrders = async (assets: IAsset[]) => {
        try {
            await updateProductImages(assets.map(it => ({
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
