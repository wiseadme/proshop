import { ref } from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { Group } from '@modules/groups/model/group.model'
import type { IGroup } from '@proshop/types'

export const useGroupModel = createSharedComposable(() => {
    const model = ref<IGroup>(Group.create())

    const clearModel = () => {
        model.value = Group.create()
    }

    const setModel = (value: IGroup): void => {
        model.value = Group.create(value)
    }

    return {
        model,
        setModel,
        clearModel,
    }
})
