import {
    computed,
    ref,
    unref
} from 'vue'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

import { Option } from '@modules/groups/model/option.model'

import { IOption } from '@proshop-app/types'

export const useOptionModel = createSharedComposable(() => {
    const model = ref(Option.create())

    const isEditMode = computed(() => unref(model).id)

    const setModel = (option?: IOption): void => {
        model.value = Option.create(option)
    }

    return {
        model,
        isEditMode,
        setModel,
    }
})
