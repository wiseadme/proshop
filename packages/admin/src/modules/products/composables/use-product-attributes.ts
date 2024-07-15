import {
    ref,
    unref,
    watch,
} from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

import { useProduct } from '@modules/products/composables/use-product'
import { useProductModel } from '@modules/products/composables/use-product-model'
import { useProductsService } from '@modules/products/composables/use-products-service'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import type { IAttribute, IProduct } from '@proshop-app/types'


import {
    CHANGES_SAVED,
    NO_CHANGES,
    SAVING_ERROR,
} from '@shared/constants/notifications'
import { hasValueDiffs } from '@shared/helpers/diffs.helpers'

export const useProductAttributes = createSharedComposable(() => {
    const { model, setProductModel } = useProductModel()

    const {
        attributeItems,
        addProductAttribute,
        deleteProductAttribute,
        updateProductAttributes,
    } = useProductsService()

    const { product, setCurrentProduct } = useProduct()

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
        setProductModel(unref(product) as IProduct)
        isEditMode.value = false
    }

    const onRemoveAttribute = async (attribute: IAttribute) => {
        try {
            const updatedProduct = await deleteProductAttribute({
                id: unref(product)!.id,
                attributeId: attribute.id
            })

            setCurrentProduct(updatedProduct)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const onAddAttribute = async (attribute: IAttribute) => {
        try {
            const updatedProduct = await addProductAttribute({
                id: unref(product)!.id,
                attribute
            })

            setCurrentProduct(updatedProduct)

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
            const updatedProduct = await updateProductAttributes({
                id: unref(product)!.id,
                attributes
            })

            setCurrentProduct(updatedProduct)

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
