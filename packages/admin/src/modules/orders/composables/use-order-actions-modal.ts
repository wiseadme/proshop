import { ref } from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

import { useRouter } from 'vue-router'

import { RouteNames } from '@modules/orders/enums/route-names'

export const useOrderActionsModal = createSharedComposable(() => {
    const router = useRouter()
    const showModal = ref(false)

    const openOrder = () => showModal.value = true

    const closeOrder = async () => {
        await router.push({ name: RouteNames.ORDERS, params: { orderId: '' } })
        showModal.value = false
    }

    return {
        showModal,
        openOrder,
        closeOrder,
    }
})
