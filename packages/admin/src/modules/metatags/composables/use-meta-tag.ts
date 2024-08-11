import {
    nextTick,
    ref,
    unref
} from 'vue'


import { useMetaTagForm } from '@modules/metatags/composables/use-meta-tag-form'
import { useMetaTagsService } from '@modules/metatags/composables/use-meta-tags-service'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'


import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import { MetaTag } from '@modules/metatags/model/metaTag.model'

import type { IMetaTag } from '@proshop-app/types'

import {
    META_TAG_DELETED,
    META_TAG_DELETE_ERROR,
    META_TAG_SAVED,
    META_TAG_SAVING_ERROR,
} from '@modules/metatags/constants/notifications'
import { clone } from '@shared/helpers'

export const useMetaTag = createSharedComposable(() => {
    const {
        setAsCurrent,
        updateMetaTag,
        createMetaTag,
        deleteMetaTag,
    } = useMetaTagsService()

    const { toggleModal } = useMetaTagForm()

    const { notify } = useNotifications()

    const model = ref<IMetaTag>(MetaTag.create())
    const isEditMode = ref<boolean>(false)

    const clearAll = () => {
        setAsCurrent(null)
        model.value = MetaTag.create()
        isEditMode.value = false
    }

    const onEditMetaTag = (item: IMetaTag) => {
        setAsCurrent(item)

        unref(model).props = clone(item.props)
        unref(model).order = item.order

        isEditMode.value = true
        toggleModal(true)
    }

    const onDeleteMetaTag = async (item: IMetaTag) => {
        try {
            await deleteMetaTag(item.id)

            notify(META_TAG_DELETED)
        } catch (err) {
            notify(META_TAG_DELETE_ERROR)
        }
    }

    const onSaveMetaTag = async () => {
        const action = unref(isEditMode) ? updateMetaTag : createMetaTag

        try {
            await action(unref(model))

            await nextTick(() => {
                clearAll()
                isEditMode.value = false
            })

            notify(META_TAG_SAVED)
        } catch (err) {
            notify(META_TAG_SAVING_ERROR)
        }
    }

    return {
        model,
        isEditMode,
        clearAll,
        onSaveMetaTag,
        onDeleteMetaTag,
        onEditMetaTag,
    }
})
