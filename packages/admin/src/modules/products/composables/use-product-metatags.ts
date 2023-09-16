import {
    ref,
    unref,
    watch,
} from 'vue'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { useProductModel } from '@modules/products/composables/use-product-model'
import { IMetaTag, Maybe } from '@proshop/types'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
import { CHANGES_SAVED, SAVING_ERROR } from '@shared/constants/notifications'

export const useProductMetaTags = createSharedComposable(() => {
    const { model } = useProductModel()
    const { metaTagItems, updateProductMetaTags } = useProductsService()
    const { notify } = useNotifications()

    const currentEditableMetaTag = ref<Maybe<IMetaTag>>(null)

    const availableMetaTags = ref<Maybe<IMetaTag[]>>(null)
    const usedMetaTags = ref<Maybe<IMetaTag[]>>(null)

    const setForEditing = (item: IMetaTag) => {
        currentEditableMetaTag.value = item
    }

    const onUpdateMetaTags = async () => {
        try {
            await updateProductMetaTags({ seo: unref(model).seo })

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
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
        currentEditableMetaTag,
        usedMetaTags,
        availableMetaTags,
        setForEditing,
        onUpdateMetaTags,
    }
})
