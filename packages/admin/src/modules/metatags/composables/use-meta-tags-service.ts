import {
    computed,
    ref,
    unref
} from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useMetaTagsStore } from '@modules/metatags/store'
import { IMetaTag, Maybe } from '@proshop/types'

export const useMetaTagsService = createSharedComposable(() => {
    const _store = useMetaTagsStore()

    const metaTag = ref<Maybe<IMetaTag>>(null)

    const metaTags = computed<IMetaTag[]>(() => _store.metaTags || [])

    const setAsCurrent = (item: Maybe<IMetaTag>) => {
        metaTag.value = item
    }

    const onCreateMetaTag = (item: IMetaTag) => {
        return _store.create(item)
    }

    const onUpdateMetaTag = (updates: Partial<IMetaTag>) => {
        updates.id = unref(metaTag)!.id

        return _store.update(updates)
    }

    const onDeleteMetaTag = (metaTag: IMetaTag) => {
        return _store.delete(metaTag.id)
    }

    const fetchMetaTags = (params = {}) => {
        return _store.read(params)
    }

    return {
        metaTag,
        metaTags,
        setAsCurrent,
        fetchMetaTags,
        onCreateMetaTag,
        onUpdateMetaTag,
        onDeleteMetaTag
    }
})