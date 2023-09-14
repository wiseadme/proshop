import {
    ref,
    unref,
    watch,
} from 'vue'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { useProductModel } from '@modules/products/composables/use-product-model'
import { IAttribute } from '@proshop/types'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useNotifications } from '@shared/components/VNotifications/use-notifications'
import { hasValueDiffs } from '@shared/helpers/diffs.helpers'
import {
    CHANGES_SAVED,
    NO_CHANGES,
    SAVING_ERROR,
} from '@shared/constants/notifications'

export const useProductAttributes = createSharedComposable(() => {
    const { model, setProductModel } = useProductModel()

    const {
        product,
        attributeItems,
        updateProductAttributes,
    } = useProductsService()

    const { notify } = useNotifications()

    const attributes = ref<IAttribute[]>([])
    const currentEditableAttribute = ref<Maybe<IAttribute>>(null)
    const availableAttributes = ref<IAttribute[]>([])
    const usedAttributes = ref<IAttribute[]>([])

    const setForEditing = (attr: IAttribute) => {
        currentEditableAttribute.value = attr
    }

    const onDeleteAttribute = async (attr: IAttribute) => {
        attributes.value = unref(model).attributes.filter(it => it.id !== attr.id)

        try {
            await updateProductAttributes({ attributes: unref(attributes) })

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const checkDiffs = () => hasValueDiffs({
        model: unref(model).attributes,
        entity: unref(product)!.attributes,
    })

    const onDiscardChanges = () => {
        setProductModel(unref(product)!)
        currentEditableAttribute.value = null
    }

    const onUpdateAttributes = async () => {
        if (!checkDiffs()) {
            notify(NO_CHANGES)

            return
        }

        const attributes = unref(model).attributes

        try {
            await updateProductAttributes({ attributes })

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    watch(() => unref(model).attributes, (attrs) => {
        const map = attrs?.reduce((acc, it) => {
            acc[it.id] = true

            return acc
        }, {}) || {}

        availableAttributes.value = unref(attributeItems)?.filter(it => !map[it.id]) || []
        usedAttributes.value = unref(attributeItems)?.filter(it => map[it.id]) || []
    }, { immediate: true })

    return {
        attributes,
        attributeItems,
        currentEditableAttribute,
        availableAttributes,
        usedAttributes,
        setForEditing,
        onDeleteAttribute,
        onUpdateAttributes,
        onDiscardChanges,
    }
})
