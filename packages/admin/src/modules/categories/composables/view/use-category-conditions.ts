import { computed, unref } from 'vue'

import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
import { useCategoryModel } from '@modules/categories/composables/use-category-model'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import {
    CATEGORY_CONDITION_UPDATED,
    CATEGORY_CONDITION_UPDATING_ERROR
} from '@modules/categories/constants/notifications'

export const useCategoryConditions = () => {
    const { model } = useCategoryModel()
    const { updateCategory } = useCategoriesService()
    const {notify} = useNotifications()

    const conditions = computed(() => unref(model).conditions)

    const onUpdateCondition = async () => {
        try {
            await updateCategory({
                id: unref(model).id,
                conditions: unref(conditions)
            })

            notify(CATEGORY_CONDITION_UPDATED)
        }catch (err) {
            notify(CATEGORY_CONDITION_UPDATING_ERROR)
        }
    }

    return {
        onUpdateCondition,
        conditions,
    }
}
