import {
    ref,
    unref,
    watch,
} from 'vue'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { useProduct } from '@modules/products/composables/use-product'
import { IAttribute } from '@proshop/types'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useAppNotifications } from '@shared/composables/use-app-notifications'
import { toString } from '@shared/helpers'

export const useProductAttributes = createSharedComposable(() => {
    const { model } = useProduct()

    const {
        product,
        attributeItems,
        updateProductAttributes
    } = useProductsService()

    const {
        changesSavedNotification,
        savingErrorNotification,
        noChangesNotification
    } = useAppNotifications()

    const attributes = ref<IAttribute[]>([])
    const currentEditableAttribute = ref<Maybe<IAttribute>>(null)
    const availableAttributes = ref<IAttribute[]>([])
    const usedAttributes = ref<IAttribute[]>([])

    const setForEditing = (attr: IAttribute) => {
        currentEditableAttribute.value = attr
    }

    const hasValueDiffs = () => toString(unref(model).attributes) !== toString(unref(product)!.attributes)

    const onDeleteAttribute = async (attr: IAttribute) => {
        attributes.value = unref(model).attributes.filter(it => it.id !== attr.id)

        try {
            await updateProductAttributes({ attributes: unref(attributes) })
            changesSavedNotification()
        } catch (err) {
            savingErrorNotification()
        }
    }

    const onUpdateAttributes = async () => {
        if (!hasValueDiffs()) {
            noChangesNotification()

            return
        }

        const attributes = unref(model).attributes

        try {
            await updateProductAttributes({ attributes })
            changesSavedNotification()
        } catch (err) {
            savingErrorNotification()
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
    }
})
