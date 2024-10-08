import { ref, watch } from 'vue'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

import { IAttribute } from '@proshop-app/types'

import { useAttributesStore } from '@modules/attributes/store'

export const useAttributesService = createSharedComposable(() => {
    const _store = useAttributesStore()

    const attributes = ref<IAttribute[]>([])
    const attribute = ref<Maybe<IAttribute>>()

    const updateAttribute = (updates) => _store.update(updates)

    const createAttribute = (attribute) => _store.create(attribute)

    const deleteAttribute = (id) => _store.delete(id)

    const getAttributes = () => _store.read()

    const setAsCurrent = (attr: IAttribute) => {
        attribute.value = attr
    }

    watch(() => _store.attributes, (items) => {
        attributes.value = items!
    }, { immediate: true })

    return {
        attributes,
        attribute,
        getAttributes,
        createAttribute,
        updateAttribute,
        deleteAttribute,
        setAsCurrent,
    }
})
