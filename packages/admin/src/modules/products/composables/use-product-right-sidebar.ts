import { createSharedComposable } from '@shared/features/create-shared-composable'
import { ref } from 'vue'

export const useProductRightSidebar = createSharedComposable(() => {
    const activeItem = ref<any>(null)

    return {
        activeItem
    }
})
