import { ref } from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'

export const useOrderActionsModal = createSharedComposable(() => {
  const showModal = ref(false)

  const openOrder = () => showModal.value = true
  const closeOrder = () => showModal.value = false

  return {
    showModal,
    openOrder,
    closeOrder,
  }
})
