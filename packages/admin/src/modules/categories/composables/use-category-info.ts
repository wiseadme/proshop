import { unref } from 'vue'

import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
import { useCategoryModel } from '@modules/categories/composables/use-category-model'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import { ICategory } from '@proshop/types'

import {
    CHANGES_SAVED,
    NO_CHANGES,
    SAVING_ERROR,
} from '@shared/constants/notifications'
import { hasDiffs, hasValueDiffs } from '@shared/helpers/diffs.helpers'

const infoBlockKeys = ['title', 'order', 'seo', 'url', 'parentId']

export const useCategoryInfo = () => {
    const { model, isEditMode } = useCategoryModel()
    const { category, updateCategory, createCategory } = useCategoriesService()
    const { notify } = useNotifications()
    const getInfoBlockUpdates = (): Partial<ICategory> => infoBlockKeys.reduce((updates, key) => {
        const values = {
            model: unref(model)[key],
            entity: unref(category)![key],
        }

        if (typeof unref(model)[key] !== 'object' && hasDiffs(values)) {
            updates[key] = unref(model)[key]
        } else if (hasValueDiffs(values)) {
            updates[key] = unref(model)[key]
        }

        return updates
    }, {} as Partial<ICategory>)

    const onUpdateCategoryInfo = async () => {
        const updates = getInfoBlockUpdates()

        if (!Object.keys(updates).length) {
            notify(NO_CHANGES)

            return
        }

        try {
            await updateCategory(updates)

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    const onCreateCategoryInfo = async () => {
        try {
            await createCategory(unref(model))

            notify(CHANGES_SAVED)
        } catch {
            notify(SAVING_ERROR)
        }
    }

    const onSubmit = async (validate) => {
        try {
            await validate()

            unref(isEditMode) ? await onUpdateCategoryInfo() : await onCreateCategoryInfo()
        } catch {
            notify(SAVING_ERROR)
        }
    }

    return {
        onSubmit,
    }
}
