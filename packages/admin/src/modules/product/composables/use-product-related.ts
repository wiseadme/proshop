import { computed, ref, unref } from 'vue'
import { useProductsService } from '@modules/product/composables/use-products-service'
import { ICategory, IProduct } from '@ecommerce-platform/types'

export const useProductRelated = () => {
  const {
    categoryItems,
    product,
    categoryProducts,
    getCategoryProducts
  } = useProductsService()

  const related = computed<IProduct[]>(() => unref(product)?.related! as IProduct[])
  const category = ref<ICategory>(unref(categoryItems)?.[0]!)

  const getProducts = () => getCategoryProducts(unref(category))

  return {
    categoryItems,
    categoryProducts,
    related,
    category,
    getProducts
  }
}
