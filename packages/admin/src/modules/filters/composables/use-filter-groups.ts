import {
    computed,
    ref,
    unref,
} from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'

import { FilterGroup } from '@modules/filters/model/filterGroup.model'

import { IAttribute, IFilterGroup } from '@proshop/types'

export const useFilterGroups = createSharedComposable(() => {
    const {
        filterGroups,
        attributes,
        createFilterGroupItem,
        deleteFilterGroupItem,
        updateFilterGroupItem,
    } = useFilterGroupService()

    const model = ref<IFilterGroup>(FilterGroup.create({}))
    const linkedAttribute = ref<Maybe<IAttribute>>(null)
    const showGroupForm = ref(false)

    const isGroupEditMode = computed(() => Boolean(unref(model).id))

    const onSelectAttribute = (attribute) => {
        unref(model).attributeId = attribute.id
    }

    const onDeleteGroup = (group: IFilterGroup) => deleteFilterGroupItem(group.id)

    const onEditGroup = (group: IFilterGroup) => {
        showGroupForm.value = true
        model.value = FilterGroup.create(group)

        linkedAttribute.value = unref(attributes)?.find(attr => attr.id === group.attributeId) ?? null
    }

    const onSubmit = async (validate) => {
        try {
            await validate()

            if (unref(isGroupEditMode)) {
                await updateFilterGroupItem(unref(model))
            } else {
                await createFilterGroupItem(unref(model))
            }
        } catch (err) {
            console.log(err)
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
