import { ref } from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'

export const useActionsModal = createSharedComposable(() => {
  const showModal = ref(false)

  const openActionsModal = () => (showModal.value = true)
  const closeActionsModal = () => (showModal.value = false)

  return {
    showModal,
    openActionsModal,
    closeActionsModal
  }
})
