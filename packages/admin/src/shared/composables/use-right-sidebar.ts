import { createSharedComposable } from '@shared/features/create-shared-composable'
import { DefineComponent, ref } from 'vue'

export interface SidebarTab {
    component: InstanceType<DefineComponent<{}, {}, any>>
    title: string
    isActive: boolean
    disabled: boolean
    independent: boolean
    section: string
}

export const useRightSidebar = createSharedComposable(() => {
    const activeItem = ref<any>(null)

    const setActiveNavItem = (item) => {
        activeItem.value = item
    }

    return {
        activeItem,
        setActiveNavItem,
    }
})