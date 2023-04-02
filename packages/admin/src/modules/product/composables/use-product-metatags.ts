import { ref, unref, watch } from 'vue'
import { useProductsService } from '@modules/product/composables/use-products-service'
import { useProduct } from '@modules/product/composables/use-product'
import { IMetaTag, Maybe } from '@ecommerce-platform/types'

export const useProductMetatags = () => {
  const { model } = useProduct()
  const { metaTagItems } = useProductsService()

  const availableMetaTags = ref<Maybe<IMetaTag[]>>(null)
  const usedMetaTags = ref<Maybe<IMetaTag[]>>(null)

  watch(() => unref(model).seo.metatags, (metaTags) => {
    availableMetaTags.value = metaTags
  })

  watch(() => unref(model).seo.metatags, (metaTags) => {
    const map = metaTags.reduce((acc, it) => {
      acc[it._id] = true

      return acc
    }, {})

    usedMetaTags.value = unref(metaTagItems)?.filter(it => !map[it._id]) || []
  })

  return {
    usedMetaTags,
    availableMetaTags
  }
}
