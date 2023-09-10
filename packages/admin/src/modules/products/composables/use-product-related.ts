import {
    computed,
    ref,
    unref,
} from 'vue'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { IProduct } from '@proshop/types'
import { useProduct } from '@modules/products/composables/use-product'
import { useAppNotifications } from '@shared/composables/use-app-notifications'

export const useProductRelated = () => {
    const {
        product,
        getProducts,
        updateProductRelatedProducts,
    } = useProductsService()

    const {
        changesSavedNotification,
        savingErrorNotification,
    } = useAppNotifications()

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
            changesSavedNotification()
        } catch (err) {
            savingErrorNotification()
        }
    }

    const onDeleteRelated = async (item: IProduct) => {
        let { related } = unref(model) as { related: IProduct[] }

        related = related.filter((it) => it.id !== item.id)

        try {
            await updateProductRelatedProducts({ related })
            changesSavedNotification()
        } catch (err) {
            savingErrorNotification()
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
