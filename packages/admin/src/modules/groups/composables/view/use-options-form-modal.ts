import { ref } from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'

export const useOptionsFormModal = createSharedComposable(() => {
    const isOptionsModalVisible = ref(false)

    return {
        isOptionsModalVisible
    }
})
