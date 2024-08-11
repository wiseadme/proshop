import {
    DeepReadonly,
    Ref,
    ref
} from 'vue'

import {
    useMerchantRepository
} from '@modules/settings/composables/repository/use-merchant-repository'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

import { useLogger } from '@shared/utils/logger'

import { IMerchant } from '@proshop-app/types'

export const useMerchantService = createSharedComposable(() => {
    const repository = useMerchantRepository()
    const { logError } = useLogger()

    const _merchant = ref<Maybe<IMerchant>>(null)

    const createMerchantSettings = async (merchant: IMerchant) => {
        try {
            const { data } = await repository.createMerchant(merchant)

            _merchant.value = data
        } catch (err) {
            logError('Merchant Service: merchant creating failed', err)

            return Promise.reject(err)
        }
    }

    const getMerchantSettings = async () => {
        try {
            const { data } = await repository.getMerchant()

            _merchant.value = data
        } catch (err) {
            logError('Merchant Service: merchant loading failed', err)

            return Promise.reject(err)
        }
    }

    const updateMerchantSettings = async (updates: Partial<IMerchant>) => {
        try {
            const { data } = await repository.updateMerchant(updates)

            _merchant.value = data
        } catch (err) {
            logError('Merchant Service: merchant updating failed', err)

            return Promise.reject(err)
        }
    }

    return {
        merchant: _merchant as Ref<DeepReadonly<IMerchant>>,
        createMerchantSettings,
        getMerchantSettings,
        updateMerchantSettings,
        cancelRequests: repository.cancel
    }
})
