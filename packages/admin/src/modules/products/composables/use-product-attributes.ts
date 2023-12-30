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
        addProductAttribute,
        deleteProductAttribute,
        updateProductAttributes,
    } = useProductsService()

    const { notify } = useNotifications()

    const attributes = ref<IAttribute[]>([])
    const availableAttributes = ref<IAttribute[]>([])
    const usedAttributes = ref<IAttribute[]>([])
    const editable = ref<Maybe<IAttribute>>(null)
    const isEditMode = ref(false)

    const setForEditing = (attr: IAttribute) => {
        editable.value = attr
        isEditMode.value = true
    }

    const checkDiffs = () => hasValueDiffs({
        model: unref(model).attributes,
        entity: unref(product)!.attributes,
    })

    const onDiscardChanges = () => {
        setProductModel(unref(product)!)
        isEditMode.value = false
    }

    const onRemoveAttribute = async (attribute: IAttribute) => {
        try {
            await deleteProductAttribute(attribute.id)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const onAddAttribute = async (attribute: IAttribute) => {
        try {
            await addProductAttribute(attribute)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
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
        editable,
        availableAttributes,
        usedAttributes,
        isEditMode,
        setForEditing,
        onRemoveAttribute,
        onUpdateAttributes,
        onDiscardChanges,
        onAddAttribute,
    }
})
