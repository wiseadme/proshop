import { unref } from 'vue'

import { useProductModel } from '@modules/products/composables/use-product-model'
import { useProductsService } from '@modules/products/composables/use-products-service'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import {
    PRODUCT_CONDITIONS_UPDATED,
    PRODUCT_CONDITIONS_UPDATE_ERROR
} from '@modules/products/constants/notifications'

export const useProductConditions = () => {
    const { model } = useProductModel()
    const { updateProduct } = useProductsService()
    const { notify } = useNotifications()

    const onUpdateConditions = async () => {
        const { conditions } = unref(model)

        try {
            await updateProduct({
                id: unref(model).id,
                conditions
            })

            notify(PRODUCT_CONDITIONS_UPDATED)
        } catch (err) {
            notify(PRODUCT_CONDITIONS_UPDATE_ERROR)
        }
    }

    return {
        onUpdateConditions
    }
}
