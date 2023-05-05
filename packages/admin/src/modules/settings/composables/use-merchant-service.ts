import { computed, unref } from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useMerchantStore } from '@modules/settings/store/merchant'
import { IMerchant } from '@ecommerce-platform/types'

export const useMerchantService = createSharedComposable(() => {
  const _store = useMerchantStore()
  const {createMerchant, updateMerchant, getMerchant} = _store

  const merchant = computed<Maybe<IMerchant>>(() => _store.merchant)

  const createMerchantSettings = (merchant: IMerchant) => {
    return createMerchant(merchant)
  }

  const getMerchantSettings = () => {
    if (unref(merchant)) return

    return getMerchant()
  }

  const updateMerchantSettings = (updates: Partial<IMerchant>) => {
    updates._id = unref(merchant)?._id

    return updateMerchant(updates)
  }

  return {
    merchant,
    createMerchantSettings,
    getMerchantSettings,
    updateMerchantSettings
  }
})
