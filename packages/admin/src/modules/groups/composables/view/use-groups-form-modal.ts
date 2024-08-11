import { ref } from 'vue'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

export const useGroupsFormModal = createSharedComposable(() => {
    const isGroupModalVisible = ref(false)

    return {
        isGroupModalVisible
    }
})
