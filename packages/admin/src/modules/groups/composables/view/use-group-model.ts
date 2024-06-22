import { ref } from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { Group } from '@modules/groups/model/group.model'
import { Option } from '@modules/groups/model/option.model'
import type { IGroup } from '@proshop/types'

export const useGroupModel = createSharedComposable(() => {
    const model = ref<IGroup>(Group.create())
    const optionModel = ref(Option.create())

    return {
        model,
        optionModel
    }
})
