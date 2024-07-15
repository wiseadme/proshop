import {
    computed,
    ref,
    unref,
} from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'

import { FilterGroup } from '@modules/filters/model/filterGroup.model'

import { useLogger } from '@shared/utils/logger'

import type { IAttribute, IFilterGroup } from '@proshop-app/types'

export const useFilterGroups = createSharedComposable(() => {
    const {
        filterGroups,
        attributes,
        createFilterGroup,
        deleteFilterGroup,
        updateFilterGroup,
    } = useFilterGroupService()

    const { logError } = useLogger()

    const model = ref<IFilterGroup>(FilterGroup.create({}))
    const linkedAttribute = ref<Maybe<IAttribute>>(null)
    const showGroupForm = ref(false)

    const isGroupEditMode = computed(() => Boolean(unref(model).id))

    const onSelectAttribute = (attribute: IAttribute) => {
        unref(model).attributeId = attribute.id
    }

    const onDeleteGroup = (group: IFilterGroup) => deleteFilterGroup(group.id)

    const onEditGroup = (group: IFilterGroup) => {
        showGroupForm.value = true
        model.value = FilterGroup.create(group)

        linkedAttribute.value = unref(attributes)?.find(attr => attr.id === group.attributeId) ?? null
    }

    const onSubmit = async (validate: () => Promise<void>) => {
        try {
            await validate()

            if (unref(isGroupEditMode)) {
                await updateFilterGroup(unref(model))
            } else {
                await createFilterGroup(unref(model))
            }
        } catch (err) {
            logError('Filter group operation failed', err)
        }
    }

    return {
        model,
        attributes,
        filterGroups,
        showGroupForm,
        linkedAttribute,
        onSubmit,
        onSelectAttribute,
        onDeleteGroup,
        onEditGroup,
    }
})
