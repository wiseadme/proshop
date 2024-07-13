import {
    computed,
    ref,
    unref,
} from 'vue'

import { useProduct } from '@modules/products/composables/use-product'
import { useProductModel } from '@modules/products/composables/use-product-model'
import { useProductsService } from '@modules/products/composables/use-products-service'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import { IProduct } from '@proshop/types'

import { CHANGES_SAVED, SAVING_ERROR } from '@shared/constants/notifications'

export const useProductRelated = () => {
    const {
        product,
        getProducts,
        updateProductRelatedProducts,
    } = useProductsService()

    const { setCurrentProduct } = useProduct()

    const { notify } = useNotifications()
    const { model } = useProductModel()

    const searchedItems = ref<IProduct[]>([])
    const relatedProduct = ref<Maybe<IProduct>>(null)

    const related = computed<IProduct[]>(() => (unref(product)?.related || []) as IProduct[])

    const onSearchInput = async (val: string) => {
        searchedItems.value = await getProducts({ name: val })
    }

    const onSelectSearched = (product: IProduct) => {
        relatedProduct.value = product
    }

    const onAddToRelated = async () => {
        const { related } = unref(model) as { related: IProduct[] }

        related.push(unref(relatedProduct)!)
        relatedProduct.value = null

        try {
            const product = await updateProductRelatedProducts({ related })

            setCurrentProduct(product)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const onDeleteRelated = async (item: IProduct) => {
        let { related } = unref(model) as { related: IProduct[] }

        related = related.filter((it) => it.id !== item.id)

        try {
            const product = await updateProductRelatedProducts({ related })

            setCurrentProduct(product)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    return {
        searchedItems,
        relatedProduct,
        related,
        onDeleteRelated,
        onAddToRelated,
        onSelectSearched,
        onSearchInput,
    }
}
