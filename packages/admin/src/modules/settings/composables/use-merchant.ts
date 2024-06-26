import {
    computed,
    ref,
    unref,
    watch
} from 'vue'

import { createSharedComposable } from '@shared/features/create-shared-composable'

import { useMerchantService } from '@modules/settings/composables/use-merchant-service'

import { Merchant } from '@modules/settings/model/merchant.model'

import { IMerchant } from '@proshop/types'

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
