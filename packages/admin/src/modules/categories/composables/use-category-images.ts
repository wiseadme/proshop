import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
import { IAsset } from '@proshop/types'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
import { CHANGES_SAVED, SAVING_ERROR } from '@shared/constants/notifications'
import { computed, unref } from 'vue'

export const useCategoryImages = () => {
    const { category, updateCategoryImagesOrders } = useCategoriesService()
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

    const onUpdateMainImage = (asset: IAsset) => {
        console.log(asset)
    }

    return {
        mainImage,
        onUpdateImagesOrders,
        onUpdateMainImage,
    }
}
