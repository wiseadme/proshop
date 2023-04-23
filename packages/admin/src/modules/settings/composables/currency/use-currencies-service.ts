import {
  computed,
  ref,
  unref
} from 'vue'
import { useCurrenciesStore } from '@modules/settings/store/currency'
import { ICurrency, Maybe } from '@ecommerce-platform/types'
import { useLogger } from '@shared/utils/logger'

export const useCurrenciesService = () => {
  const _store = useCurrenciesStore()
  const { logError } = useLogger()

  const currency = ref<Maybe<ICurrency>>(null)

  const currencies = computed<Maybe<ICurrency[]>>(() => _store.currencies)

  const createCurrency = async (currency: ICurrency) => {
    try {
      await _store.createCurrency(currency)
    } catch (error) {
      logError('Create currency failed', error)
    }
  }

  const setAsCurrent = (currency) => {
    currency.value = unref(currency)
  }

  return {
    currencies,
    currency,
    setAsCurrent,
    createCurrency
  }
}
