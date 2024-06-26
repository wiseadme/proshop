import {
    ref,
    unref,
    watch,
} from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

import { useProductModel } from '@modules/products/composables/use-product-model'
import { useProductsService } from '@modules/products/composables/use-products-service'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import { IMetaTag, Maybe } from '@proshop/types'


import { CHANGES_SAVED, SAVING_ERROR } from '@shared/constants/notifications'

export const useProductMetaTags = createSharedComposable(() => {
    const { model, modelMetaTags } = useProductModel()

    const {
        metaTagItems,
        updateProductMetaTags,
        addProductMetaTag,
        deleteProductMetaTag,
    } = useProductsService()

    const { notify } = useNotifications()

    const currentEditableMetaTag = ref<Maybe<IMetaTag>>(null)
    const availableMetaTags = ref<Maybe<IMetaTag[]>>(null)
    const isMetaTagEditMode = ref(false)

    const setForEditing = (item: IMetaTag) => {
        currentEditableMetaTag.value = item
        isMetaTagEditMode.value = true
    }

    const closeEditModal = () => isMetaTagEditMode.value = false

    const onUpdateMetaTags = async () => {
        unref(model).seo.metatags.forEach((it, i) => it.order = i)

        try {
            await updateProductMetaTags(unref(model).seo.metatags)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    /** TODO - исправить поведение по ордерам метатегов при дропе в конкретное место, а не в конец массива */
    const onAddMetaTag = async (metaTag: IMetaTag) => {
        try {
            await addProductMetaTag(metaTag)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const onRemoveMetaTag = async (metaTag: IMetaTag) => {
        try {
            await deleteProductMetaTag(metaTag)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    watch(modelMetaTags, (metaTags) => {
        const map = metaTags.reduce((acc, it) => ({ ...acc, [it.id]: true }), {})

        availableMetaTags.value = unref(metaTagItems)?.filter(it => !map[it.id]) || []
    }, { immediate: true })

    return {
        currentEditableMetaTag,
        availableMetaTags,
        isMetaTagEditMode,
        setForEditing,
        closeEditModal,
        onUpdateMetaTags,
        onAddMetaTag,
        onRemoveMetaTag,
    }
})
