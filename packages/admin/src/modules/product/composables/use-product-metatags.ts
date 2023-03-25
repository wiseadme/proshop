import { computed, unref } from 'vue'
import { useProduct } from '@modules/product/composables/use-product'
import { IMetaTag } from '@ecommerce-platform/types'

export const useProductMetatags = () => {
  const { metaTagItems, model } = useProduct()

  const usedMetaTags = computed<IMetaTag[]>(() => unref(model).seo.metatags)

  const availableMetaTags = computed(() => {
    const productTagsMap = unref(model).seo?.metatags.reduce((acc, it) => {
      acc[it._id] = true
      return acc
    }, {})

    return unref(metaTagItems)?.filter(it => !productTagsMap[it._id])
  })

  return {
    usedMetaTags,
    availableMetaTags
  }
}
