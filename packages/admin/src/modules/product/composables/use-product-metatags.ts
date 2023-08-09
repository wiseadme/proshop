import {
    ref,
    unref,
    watch
} from 'vue'
import { useProductsService } from '@modules/product/composables/use-products-service'
import { useProduct } from '@modules/product/composables/use-product'
import { IMetaTag, Maybe } from '@proshop/types'
import { createSharedComposable } from '@shared/features/create-shared-composable'

export const useProductMetaTags = createSharedComposable(() => {
    const { model } = useProduct()
    const { metaTagItems } = useProductsService()

    const metaTag = ref<Maybe<IMetaTag>>(null)

    const availableMetaTags = ref<Maybe<IMetaTag[]>>(null)
    const usedMetaTags = ref<Maybe<IMetaTag[]>>(null)

    const editTag = (item: IMetaTag) => {
        metaTag.value = item
    }

    watch(() => unref(model).seo.metatags, (metaTags) => {
        const map = metaTags.reduce((acc, it) => {
            acc[it.id] = true

            return acc
        }, {})

        availableMetaTags.value = unref(metaTagItems)?.filter(it => !map[it.id]) || []
        usedMetaTags.value = unref(metaTagItems)?.filter(it => map[it.id]) || []
    }, { immediate: true })

    return {
        metaTag,
        usedMetaTags,
        availableMetaTags,
        editTag
    }
})
