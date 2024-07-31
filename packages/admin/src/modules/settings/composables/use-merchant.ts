import {
    computed,
    ref,
    unref,
    watch
} from 'vue'

import { useMerchantService } from '@modules/settings/composables/use-merchant-service'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'


import { Merchant } from '@modules/settings/model/merchant.model'

import type { IMerchant } from '@proshop-app/types'

export const useMerchant = createSharedComposable(() => {
    const { merchant, createMerchantSettings, getMerchantSettings, updateMerchantSettings } = useMerchantService()

    const model = ref<IMerchant>(Merchant.create())

    const isEditMode = computed(() => !!unref(merchant)?.id)

    const createMerchant = () => createMerchantSettings(unref(model))
    const updateMerchant = () => updateMerchantSettings(unref(model))

    watch(merchant, (data) => {
        if (data) {
            model.value = Merchant.create(data!)
        }
    }, {immediate: true})

    return {
        model,
        isEditMode,
        createMerchant,
        getMerchantSettings,
        updateMerchant
    }
})
