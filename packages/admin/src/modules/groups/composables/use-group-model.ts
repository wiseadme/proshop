import { ref } from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { Group } from '@modules/groups/model/group.model'
import type { IGroup } from '@proshop/types'
import { GroupOption } from '@modules/groups/model/group-option.model'

export const useGroupModel = createSharedComposable(()=> {
    const model = ref<IGroup>(Group.create())
    const optionModel = ref(GroupOption.create())

    return {
        model,
        optionModel
    }
})
