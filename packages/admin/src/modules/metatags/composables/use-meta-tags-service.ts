import {
    computed,
    ref,
    unref,
} from 'vue'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

import type { IMetaTag, Maybe } from '@proshop-app/types'

import { useMetaTagsStore } from '@modules/metatags/store'

export const useMetaTagsService = createSharedComposable(() => {
    const _store = useMetaTagsStore()
    const { create, read, update, delete: _delete } = _store

    const metaTag = ref<Maybe<IMetaTag>>(null)
    const metaTags = computed<IMetaTag[]>(() => _store.metaTags || [])

    const setAsCurrent = (item: Maybe<IMetaTag>) => {
        metaTag.value = item
    }

    const createMetaTag = (item: IMetaTag) => create(item)

    const updateMetaTag = (updates: Partial<IMetaTag>) => {
        updates.id = unref(metaTag)!.id

        return update(updates)
    }

    const deleteMetaTag = (id: string) => _delete(id)

    const fetchMetaTags = (params = {}) => read(params)

    return {
        metaTag,
        metaTags,
        setAsCurrent,
        fetchMetaTags,
        createMetaTag,
        updateMetaTag,
        deleteMetaTag,
    }
})
