import {
    computed,
    ref,
    unref
} from 'vue'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { ICategory, IProduct } from '@proshop/types'

export const useProductRelated = () => {
    const {
        product,
        categoryItems,
        categoryProducts,
        getCategoryProducts
    } = useProductsService()

    const related = computed<IProduct[]>(() => (unref(product)?.related || []) as IProduct[])
    const category = ref<ICategory>(unref(categoryItems)?.[0]!)

    const getProducts = () => getCategoryProducts(unref(category))

    return {
        categoryProducts,
        related,
        category,
        getProducts
    }
}