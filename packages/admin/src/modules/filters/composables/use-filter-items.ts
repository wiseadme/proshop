import { ref, unref } from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

import { useFilterItemModel } from '@modules/filters/composables/use-filter-item-model'
import { useFilterItemsService } from '@modules/filters/composables/use-filter-items-service'

import { useNotifications } from '@shared/components/VNotifications/use-notifications'

import { IFilterGroup, IFilterItem } from '@proshop/types'

import { CHANGES_SAVED, SAVING_ERROR } from '@shared/constants/notifications'

export const useFilterItems = createSharedComposable(() => {
    const {
        createFilterItem,
        updateFilterItem,
    } = useFilterItemsService()

    const { notify } = useNotifications()

    const {
        model,
        isEditMode,
        setModel,
    } = useFilterItemModel()

    const showForm = ref(false)
    const filtersGroup = ref<Maybe<IFilterGroup>>(null)

    const toggleForm = () => showForm.value = !showForm.value

    const onCloseForm = () => {
        toggleForm()
        isEditMode.value = false
    }

    const onEditFilter = (filter: IFilterItem) => {
        setModel(filter)
        toggleForm()
        isEditMode.value = true
    }

    const onSubmit = async (validate) => {
        try {
            await validate()

            if (unref(isEditMode)) {
                await updateFilterItem(unref(model))
            } else {
                await createFilterItem(unref(model))
            }

            notify(CHANGES_SAVED)
        } catch (err) {
            notify(SAVING_ERROR)
        }
    }

    return {
        isEditMode,
        showForm,
        filtersGroup,
        toggleForm,
        onCloseForm,
        setModel,
        onEditFilter,
        onSubmit,
    }
})
