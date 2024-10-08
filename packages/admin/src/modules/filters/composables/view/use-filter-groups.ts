import {
    computed,
    ref,
    unref,
} from 'vue'


import { useAttributesService } from '@modules/attributes/composables/use-attributes-service'
import {
    useFilterGroupService
} from '@modules/filters/composables/services/use-filter-group-service'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

import { FilterGroup } from '@modules/filters/model/filterGroup.model'

import { useLogger } from '@shared/utils/logger'

import type { IAttribute, IFilterGroup } from '@proshop-app/types'

export const useFilterGroups = createSharedComposable(() => {
    const {
        filterGroups,
        getFilterGroups,
        createFilterGroup,
        deleteFilterGroup,
        updateFilterGroup,
    } = useFilterGroupService()

    const { attributes, getAttributes } = useAttributesService()

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

    const getFilterGroupAttributes = () => {
        if (unref(attributes)) return

        return getAttributes()
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
        getFilterGroups,
        getFilterGroupAttributes,
    }
})
