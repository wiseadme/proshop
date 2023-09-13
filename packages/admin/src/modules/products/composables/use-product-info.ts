import {
    computed,
    ref,
    unref,
} from 'vue'
import { useProduct } from '@modules/products/composables/use-product'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
import { useRouter } from 'vue-router'
import { RouteNames } from '@modules/products/enums/route-names'
import { IProduct } from '@proshop/types'
import { hasDiffs, hasValueDiffs } from '@shared/helpers/diffs.helpers'
import {
    CHANGES_SAVED,
    NO_CHANGES,
    SAVING_ERROR,
} from '@shared/constants/notifications'

const infoBlockKeys = ['description', 'name', 'price', 'quantity', 'seo', 'url']

export const useProductInfo = () => {
    const { model } = useProduct()
    const { product, createProduct, updateProductInfo } = useProductsService()
    const { notify } = useNotifications()
    const router = useRouter()

    const isLoading = ref(false)
    const isEditMode = computed(() => Boolean(unref(model).id))

    const getInfoBlockUpdates = (): Partial<IProduct> => infoBlockKeys.reduce((updates, key) => {
        const values = {
            model: unref(model)[key],
            entity: unref(product)![key],
        }

        if (typeof unref(model)[key] !== 'object' && hasDiffs(values)) {
            updates[key] = unref(model)[key]
        } else if (hasValueDiffs(values)) {
            updates[key] = unref(model)[key]
        }

        return updates
    }, {} as Partial<IProduct>)

    const goToEditProduct = (product: IProduct) => router.push({
        name: RouteNames.PRODUCT_EDIT,
        params: {
            action: 'edit',
            productId: product.id,
            section: 'info',
        },
    })

    const onCreateProductInfo = async () => {
        try {
            const data = await createProduct(unref(model))

            await goToEditProduct(data!)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const onUpdateProductInfo = async () => {
        const updates = getInfoBlockUpdates()

        if (!Object.keys(updates).length) {
            notify(NO_CHANGES)

            return
        }

        try {
            await updateProductInfo(updates)
            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const onSubmit = async () => {
        unref(isEditMode) ? await onUpdateProductInfo() : await onCreateProductInfo()
    }

    return {
        isEditMode,
        isLoading,
        onSubmit,
    }
}
