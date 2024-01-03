import { createSharedComposable } from '@shared/features/create-shared-composable'
import { DefineComponent, ref } from 'vue'

export interface SidebarTab {
    component: InstanceType<DefineComponent<any, any, any>>
    title: string
    isActive: boolean
    disabled: boolean
    independent: boolean
    section: string
    modal: InstanceType<DefineComponent<any, any, any>>
}

export const useRightSidebar = createSharedComposable(() => {
    const activeItem = ref<Maybe<SidebarTab>>(null)

    const setActiveNavItem = (item: SidebarTab) => {
        activeItem.value = item
    }

    return {
        activeItem,
        setActiveNavItem,
    }
})
