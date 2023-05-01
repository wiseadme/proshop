import {
  ref,
  unref,
  watch
} from 'vue'
import { Merchant } from '@modules/settings/model/merchant.model'
import { IMerchant } from '@ecommerce-platform/types'
import { useMerchantService } from '@modules/settings/composables/use-merchant-service'
import { createSharedComposable } from '@shared/features/create-shared-composable'

export const useMerchant = createSharedComposable(() => {
  const { merchant, createMerchant } = useMerchantService()

  const model = ref<IMerchant>(Merchant.create())

  const createNewMerchant = () => {
    createMerchant(unref(model))
  }

  watch(merchant, (data) => {
    model.value = Merchant.create(data!)
  })

  return {
    model,
    createNewMerchant
  }
})
