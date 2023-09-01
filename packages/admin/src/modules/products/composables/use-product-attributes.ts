import {
    ref,
    unref,
    watch,
} from 'vue'
import { useProductsService } from '@modules/products/composables/use-products-service'
import { useProduct } from '@modules/products/composables/use-product'
import { IAttribute } from '@proshop/types'
import { createSharedComposable } from '@shared/features/create-shared-composable'

export const useProductAttributes = createSharedComposable(() => {
    const { attributeItems } = useProductsService()
    const { model } = useProduct()

    const attributes = ref<IAttribute[]>([])
    const currentEditableAttribute = ref<Maybe<IAttribute>>(null)
    const availableAttributes = ref<IAttribute[]>([])
    const usedAttributes = ref<IAttribute[]>([])

    const setForEditing = (attr: IAttribute) => {
        currentEditableAttribute.value = attr
    }

    const onDeleteAttribute = (attr: IAttribute) => {
        unref(model).attributes = unref(model).attributes.filter(it => it.id !== attr.id)
        attributes.value = unref(model).attributes
    }

    watch(attributeItems, (attrs) => {
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
    }
})
