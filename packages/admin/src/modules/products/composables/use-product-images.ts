import {
    computed,
    ref,
    unref,
} from 'vue'
import { IAsset } from '@proshop/types'
import { useProduct } from '@modules/products/composables/use-product'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
import { CHANGES_SAVED, SAVING_ERROR } from '@shared/constants/notifications'

export const useProductImages = () => {
    const { model } = useProduct()

    const {
        updateProductAssets,
        updateMainImageAsset,
        uploadProductImage,
        deleteProductImage,
    } = useProductsService()

    const {notify} = useNotifications()

    const images = ref<File[]>([])
    const currentImage = ref<Maybe<IAsset>>(null)

    const assets = computed(() => unref(model)?.assets || [])

    const onLoadImage = async ([file]) => {
        const { assets } = unref(model)

        try {
            const asset = await uploadProductImage(file)

            assets.push(asset)
            await updateProductAssets({ assets })

            images.value = []

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

    const setAsMainImage = async () => {
        try {
            const asset = await updateMainImageAsset(unref(currentImage)!)
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
        images,
        currentImage,
        onLoadImage,
        onDeleteImage,
        setAsMainImage,
    }
}
