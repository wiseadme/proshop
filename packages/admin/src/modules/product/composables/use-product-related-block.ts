import { computed, ref, unref } from 'vue'
import { useProductService } from '@modules/product/service/product.service'
import { ICategory, IProduct } from '@ecommerce-platform/types'

export const useProductRelatedBlock = () => {
  const productService = useProductService()

  const categories = computed<ICategory[]>(() => productService.categories!)
  const products = computed<IProduct[]>(() => productService.productsByCategory!)
  const related = computed<IProduct[]>(() => productService.product?.related!)
  const category = ref<ICategory>(unref(categories)?.[0])

  const getCategoryProducts = async () => {
    return productService.getProducts({ category: unref(category).url })
  }

  return {
    categories,
    products,
    related,
    category,
    productService,
    getCategoryProducts
  }
}
