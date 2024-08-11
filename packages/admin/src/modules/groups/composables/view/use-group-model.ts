import {
    computed,
    ref,
    unref
} from 'vue'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

import { Group } from '@modules/groups/model/group.model'

import type { IGroup } from '@proshop-app/types'

export const useGroupModel = createSharedComposable(() => {
    const model = ref<IGroup>(Group.create())

    const isEditMode = computed(() => unref(model).id)
    const hasOptions = computed(() => unref(model).hasOptions)

    const clearModel = () => {
        model.value = Group.create()
    }

    const setModel = (value?: IGroup): void => {
        model.value = Group.create(value)
    }

    return {
        model,
        hasOptions,
        isEditMode,
        setModel,
        clearModel,
    }
})
