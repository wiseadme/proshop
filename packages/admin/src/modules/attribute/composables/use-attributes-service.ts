import { computed } from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useAttributesStore } from '@modules/attribute/store'
import { IAttribute } from '@proshop/types'

export const useAttributesService = createSharedComposable(() => {
    const _store = useAttributesStore()

    const attributes = computed<IAttribute[]>(() => _store.attributes || [])

    const updateAttribute = (updates) => _store.update(updates)

    const createAttribute = (attribute) => _store.create(attribute)

    const deleteAttribute = (id) => _store.delete(id)

    const getAttributes = () => _store.read()

    return {
        attributes,
        getAttributes,
        createAttribute,
        updateAttribute,
        deleteAttribute,
    }
})
