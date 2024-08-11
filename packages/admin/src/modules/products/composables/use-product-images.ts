import {
    computed,
    toRaw,
    unref,
} from 'vue'

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
    const mainImage = computed(() => unref(assets).find(it => it.main))

    const onLoadImage = async ([file]) => {
        try {
            const updatedProduct = await uploadProductImage({
                id: unref(product)!.id,
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
                assets: unref(product)!.assets as IAsset[],
            })

            setCurrentProduct(updatedProduct)

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

            const updatedProduct = await updateProductMainImage(mainAsset)

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
