import {
    computed,
    ref,
    unref,
} from 'vue'
import { useProduct } from '@modules/products/composables/use-product'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { useAppNotifications } from '@shared/composables/use-app-notifications'
import { useRouter } from 'vue-router'
import { RouteNames } from '@modules/products/enums/route-names'
import { IProduct } from '@proshop/types'
import { toString } from '@shared/helpers'

const infoBlockKeys = ['description', 'name', 'price', 'quantity', 'seo', 'url']

export const useProductInfo = () => {
    const { model } = useProduct()
    const { product, createProduct, updateProductInfo } = useProductsService()
    const { changesSavedNotification, savingErrorNotification, noChangesNotification } = useAppNotifications()
    const router = useRouter()

    const isLoading = ref(false)
    const isEditMode = computed(() => Boolean(unref(model).id))

    const hasDiffs = (key: string) => unref(model)[key] !== unref(product)![key]
    const hasValueDiffs = (key: string) => toString(unref(model)[key]) !== toString(unref(product)![key])

    const getInfoBlockUpdates = (): Partial<IProduct> => infoBlockKeys.reduce((updates, key) => {
        if (typeof unref(model)[key] !== 'object' && hasDiffs(key)) {
            (updates[key]) = unref(model)[key]
        } else if (hasValueDiffs(key)) {
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

            changesSavedNotification()
        } catch (err) {
            savingErrorNotification()
        }
    }

    const onUpdateProductInfo = async () => {
        const updates = getInfoBlockUpdates()

        if (!Object.keys(updates).length) {
            noChangesNotification()

            return
        }

        try {
            await updateProductInfo(updates)
            changesSavedNotification()
        } catch (err) {
            savingErrorNotification()
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
