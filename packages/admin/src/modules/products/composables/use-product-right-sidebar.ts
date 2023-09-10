import { createSharedComposable } from '@shared/features/create-shared-composable'
import { ref } from 'vue'

export const useProductRightSidebar = createSharedComposable(() => {
    const activeItem = ref<any>(null)

    const setActiveNavItem = (item) => {
        activeItem.value = item
    }

    return {
        activeItem,
        setActiveNavItem
    }
})
