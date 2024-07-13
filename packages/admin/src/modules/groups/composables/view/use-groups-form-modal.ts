import { ref } from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

export const useGroupsFormModal = createSharedComposable(() => {
    const isGroupModalVisible = ref(false)

    return {
        isGroupModalVisible
    }
})
