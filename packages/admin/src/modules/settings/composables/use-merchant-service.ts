import { computed } from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useMerchantStore } from '@modules/settings/store/merchant'
import { IMerchant } from '@ecommerce-platform/types'

export const useMerchantService = createSharedComposable(() => {
  const _store = useMerchantStore()

  const merchant = computed<Maybe<IMerchant>>(() => _store.merchant)

  const createMerchant = (merchant: IMerchant) => {
    return _store.createMerchant(merchant)
  }

  return {
    merchant,
    createMerchant
  }
})
