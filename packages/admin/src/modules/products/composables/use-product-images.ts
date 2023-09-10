import {
    computed,
    ref,
    unref,
} from 'vue'
import { IAsset } from '@proshop/types'
import { useProduct } from '@modules/products/composables/use-product'
import { useAppNotifications } from '@shared/composables/use-app-notifications'
import { useProductsService } from '@modules/products/composables/use-products-service'

export const useProductImages = () => {
    const { model } = useProduct()

    const {
        updateProductAssets,
        updateMainImageAsset,
        uploadProductImage,
        deleteProductImage,
    } = useProductsService()

    const {
        changesSavedNotification,
        savingErrorNotification,
    } = useAppNotifications()

    const images = ref<File[]>([])
    const currentImage = ref<Maybe<IAsset>>(null)

    const assets = computed(() => unref(model).assets)

    const onLoadImage = async ([file]) => {
        const { assets } = unref(model)

        try {
            const asset = await uploadProductImage(file)
            assets.push(asset)
            await updateProductAssets({ assets })

            images.value = []
            changesSavedNotification()
        } catch (err) {
            savingErrorNotification()
        }
    }

    const onDeleteImage = async (image: IAsset) => {
        try {
            await deleteProductImage(image)
            changesSavedNotification()
        } catch (err) {
            savingErrorNotification()
        }
    }

    const setAsMainImage = async () => {
        try {
            const asset = await updateMainImageAsset(unref(currentImage)!)
            const { assets } = unref(model)

            assets.forEach((it) => it.main = it.id === asset.id)
            await updateProductAssets({ assets: assets })

            changesSavedNotification()
        } catch (err) {
            savingErrorNotification()
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
