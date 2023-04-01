import { computed, unref } from 'vue'
import { useProductsService } from '@modules/product/composables/use-products-service'
import { useProduct } from '@modules/product/composables/use-product'
import { IMetaTag } from '@ecommerce-platform/types'

export const useProductMetatags = () => {
  const { model } = useProduct()
  const { metaTagItems } = useProductsService()

  const usedMetaTags = computed<IMetaTag[]>(() => unref(model).seo.metatags)

  const availableMetaTags = computed<IMetaTag[]>(() => {
    const productTagsMap = unref(model).seo?.metatags.reduce((acc, it) => {
      acc[it._id] = true
      return acc
    }, {})

    return unref(metaTagItems)?.filter(it => !productTagsMap[it._id]) || []
  })

  return {
    usedMetaTags,
    availableMetaTags
  }
}
