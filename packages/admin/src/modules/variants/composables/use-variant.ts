import { ref } from 'vue'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

import { Variant } from '@modules/variants/model/variant.model'

import type { IAttribute } from '@proshop-app/types'

export const useVariant = createSharedComposable(() => {
    const model = ref(Variant.create())
    const isEditMode = ref(false)
    const linkedAttribute = ref<Maybe<IAttribute>>(null)
    const showVariantForm = ref(false)

    return {
        model,
        isEditMode,
        linkedAttribute,
        showVariantForm
    }
})
