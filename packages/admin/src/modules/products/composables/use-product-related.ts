import { computed, unref } from 'vue'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { IProduct } from '@proshop/types'

export const useProductRelated = () => {
    const {
        product,
        categoryProducts,
    } = useProductsService()

    const related = computed<IProduct[]>(() => (unref(product)?.related || []) as IProduct[])

    return {
        categoryProducts,
        related,
    }
}
