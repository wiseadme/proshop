import {
    computed,
    ref,
    unref,
} from 'vue'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { IProduct } from '@proshop/types'
import { useProduct } from '@modules/products/composables/use-product'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
import { CHANGES_SAVED, SAVING_ERROR } from '@shared/constants/notifications'

export const useProductRelated = () => {
    const {
        product,
        getProducts,
        updateProductRelatedProducts,
    } = useProductsService()

    const { notify } = useNotifications()
    const { model } = useProduct()

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
            await updateProductRelatedProducts({ related })

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const onDeleteRelated = async (item: IProduct) => {
        let { related } = unref(model) as { related: IProduct[] }

        related = related.filter((it) => it.id !== item.id)

        try {
            await updateProductRelatedProducts({ related })

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
