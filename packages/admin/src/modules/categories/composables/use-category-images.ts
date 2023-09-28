import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
import { IAsset } from '@proshop/types'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
import { CHANGES_SAVED, SAVING_ERROR } from '@shared/constants/notifications'

export const useCategoryImages = () => {
    const { updateCategoryImagesOrders } = useCategoriesService()
    const { notify } = useNotifications()

    const updateOrders = async (assets: IAsset[]) => {
        try {
            await updateCategoryImagesOrders(assets)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    return {
        updateOrders
    }
}
