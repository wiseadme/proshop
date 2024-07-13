import { DefineComponent, ref } from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

export interface ISidebarTab {
    component: InstanceType<DefineComponent<any, any, any>>
    title: string
    isActive: boolean
    disabled: boolean
    independent: boolean
    section: string
    modal?: InstanceType<DefineComponent<any, any, any>>
}

export const useRightSidebar = createSharedComposable(() => {
    const activeItem = ref<Maybe<ISidebarTab>>(null)

    const setActiveNavItem = (item: ISidebarTab) => {
        activeItem.value = item
    }

    return {
        activeItem,
        setActiveNavItem,
    }
})
