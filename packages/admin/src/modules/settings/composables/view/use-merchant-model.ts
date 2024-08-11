import {
    computed,
    ref,
    unref
} from 'vue'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

import { Merchant } from '@modules/settings/model/merchant.model'

export const useMerchantModel = createSharedComposable(() => {
    const model = ref(Merchant.create())

    const isEditMode = computed(() => unref(model).id)

    const setMerchantModel = (merchant?: Merchant): void => {
        model.value = merchant ?? Merchant.create()
    }

    return {
        model,
        isEditMode,
        setMerchantModel
    }
})
