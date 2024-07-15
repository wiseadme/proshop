import { ref, unref } from 'vue'

import { useRouter } from 'vue-router'

import { useProduct } from '@modules/products/composables/use-product'
import { useProductModel } from '@modules/products/composables/use-product-model'
import { useProductsService } from '@modules/products/composables/use-products-service'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import type { IProduct } from '@proshop-app/types'

import { INFO_BLOCK } from '@modules/products/constants/sections'
import { RouteNames } from '@modules/products/enums/route-names'
import { EDIT } from '@shared/constants/actions'
import {
    CHANGES_SAVED,
    NO_CHANGES,
    SAVING_ERROR,
} from '@shared/constants/notifications'
import { hasDiffs, hasValueDiffs } from '@shared/helpers/diffs.helpers'

const infoBlockKeys = ['description', 'name', 'price', 'quantity', 'seo', 'url', 'unit']

export const useProductInfo = () => {
    const { model, isEditMode, setProductModel } = useProductModel()
    const { createProduct, updateProductInfo } = useProductsService()
    const { product, setCurrentProduct } = useProduct()
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
            const product = await createProduct(unref(model))

            setCurrentProduct(product)

            await goToEditProduct(product!)

            notify(CHANGES_SAVED)
        } catch (err: any) {
            notify(SAVING_ERROR)
        }
    }

    const onUpdateProductInfo = async () => {
        const updates = getInfoBlockUpdates()

        if (!Object.keys(updates).length) {
            notify(NO_CHANGES)
        } else {
            try {
                updates.id = unref(product)!.id
                const updatedProduct = await updateProductInfo(updates)

                setCurrentProduct(updatedProduct)

                notify(CHANGES_SAVED)
            } catch (err) {
                notify(SAVING_ERROR)
            }
        }
    }

    const onSubmit = async (validate: () => Promise<boolean>) => {

        try {
            await validate().catch(() => {
                throw new Error('Ошибка валидации: Заполните все обязательные поля')
            })

            unref(isEditMode)
                ? await onUpdateProductInfo()
                : await onCreateProductInfo()

        } catch (err: any) {
            notify({
                ...SAVING_ERROR,
                ...(err?.message ? { text: err.message } : {}),
            })
        }
    }

    const onDismiss = () => {
        setProductModel(unref(product) as IProduct)
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
