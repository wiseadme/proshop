import { ref, unref } from 'vue'
import { useProductModel } from '@modules/products/composables/use-product-model'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
import { useRouter } from 'vue-router'
import { RouteNames } from '@modules/products/enums/route-names'
import { IProduct, IProductParams } from '@proshop/types'
import { hasDiffs, hasValueDiffs } from '@shared/helpers/diffs.helpers'
import {
    CHANGES_SAVED,
    NO_CHANGES,
    SAVING_ERROR,
} from '@shared/constants/notifications'
import { EDIT } from '@shared/constants/actions'
import { INFO_BLOCK } from '@modules/products/constants/sections'

const infoBlockKeys = ['description', 'name', 'price', 'quantity', 'seo', 'url', 'unit']

export const useProductInfo = () => {
    const { model, isEditMode, setProductModel } = useProductModel()
    const { product, createProduct, updateProductInfo } = useProductsService()
    const { notify } = useNotifications()
    const router = useRouter()

    const isLoading = ref(false)
    const textEditorKey = ref<number>(0)

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
            action: EDIT,
            sku: product.sku,
            section: INFO_BLOCK,
        },
    })

    const onCreateProductInfo = async () => {
        try {
            const data = await createProduct(unref(model) as unknown as IProductParams)

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

    const onSubmit = async (validate) => {
        try {
            await validate()

            unref(isEditMode) ? await onUpdateProductInfo() : await onCreateProductInfo()
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const onDismiss = () => {
        setProductModel(unref(product))
        textEditorKey.value += 1
    }

    return {
        isEditMode,
        isLoading,
        textEditorKey,
        onSubmit,
        onDismiss,
    }
}
