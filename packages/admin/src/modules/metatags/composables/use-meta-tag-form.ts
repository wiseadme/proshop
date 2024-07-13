import { ref, unref } from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

export const useMetaTagForm = createSharedComposable(() => {
    const showFormModal = ref(false)

    const metaProp = ref({
        key: '',
        value: '',
    })

    const clearMetaProp = () => {
        unref(metaProp).key = ''
        unref(metaProp).value = ''
    }

    const toggleModal = (state?: boolean) => {
        showFormModal.value = state ?? !showFormModal.value
    }

    return {
        showFormModal,
        metaProp,
        toggleModal,
        clearMetaProp,
    }
})
