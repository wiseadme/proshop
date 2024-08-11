import { unref, watch } from 'vue'

import { useMerchantService } from '@modules/settings/composables/use-merchant-service'
import { useMerchantModel } from '@modules/settings/composables/view/use-merchant-model'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

export const useMerchant = createSharedComposable(() => {
    const {
        merchant,
        createMerchantSettings,
        getMerchantSettings,
        updateMerchantSettings
    } = useMerchantService()

    const { model, isEditMode, setMerchantModel } = useMerchantModel()

    const createMerchant = () => createMerchantSettings(unref(model))
    const updateMerchant = () => updateMerchantSettings(unref(model))

    watch(merchant, setMerchantModel, { immediate: true })

    return {
        model,
        isEditMode,
        createMerchant,
        getMerchantSettings,
        updateMerchant
    }
})
