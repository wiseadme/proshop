import { ref } from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { Option } from '@modules/groups/model/option.model'

export const useOptionModel = createSharedComposable(() => {
    const model = ref(Option.create())

    return {
        model
    }
})
