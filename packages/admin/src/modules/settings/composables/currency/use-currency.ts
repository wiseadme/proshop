import { ref, unref } from 'vue'
import { Currency } from '@modules/settings/model/currency.model'
import { useCurrenciesService } from '@modules/settings/composables/currency/use-currencies-service'

export const useCurrency = () => {
  const { createCurrency } = useCurrenciesService()

  const model = ref(Currency.create())

  const onCreateCurrency = (validate: () => Promise<boolean>) => {
    return validate().then(() => createCurrency(unref(model)))
  }

  return {
    model,
    onCreateCurrency
  }
}
