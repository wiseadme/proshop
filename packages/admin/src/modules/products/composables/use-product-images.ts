import { computed, unref } from 'vue'

import { useProduct } from '@modules/products/composables/use-product'
import { useProductModel } from '@modules/products/composables/use-product-model'
import { useProductsService } from '@modules/products/composables/use-products-service'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import type { IAsset } from '@proshop-app/types'

import { CHANGES_SAVED, SAVING_ERROR } from '@shared/constants/notifications'

export const useProductImages = () => {
    const { model, setProductModel } = useProductModel()

    const {
        updateProductAssets,
        uploadProductImage,
        deleteProductImage,
        updateProductMainImage,
    } = useProductsService()

    const { product, setCurrentProduct } = useProduct()

    const { notify } = useNotifications()

    const assets = computed<IAsset[]>(() => (unref(model)?.assets || []) as IAsset[])

    const onLoadImage = async ([file]) => {
        try {
            const updatedProduct = await uploadProductImage({
                id: unref(product)!.id,
                dir: unref(product)!.url,
                assets: unref(product)!.assets as IAsset[],
                file
            })

            setCurrentProduct(updatedProduct)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const onDeleteImage = async (asset: IAsset) => {
        try {
            const updatedProduct = await deleteProductImage({
                asset,
                id: unref(product)!.id,
                assets: unref(product)!.assets as IAsset[],
            })

            setCurrentProduct(updatedProduct)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const setAsMainImage = async (mainAsset: IAsset) => {
        try {
            const updatedProduct = await updateProductMainImage({
                asset: mainAsset,
                id: unref(product)!.id,
            })

            setCurrentProduct(updatedProduct)
            setProductModel(updatedProduct)

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
