import { useCurrenciesRepository } from '@modules/settings/repository/currency.repository'
import { ICurrency } from '@ecommerce-platform/types'

const repository = useCurrenciesRepository()

export const actions = {
  async createCurrency(currency: ICurrency) {
    try {
      const { data } = await repository.create(currency)

      this.$patch(state => {
        state.currencies ??= []
        state.currencies.push(data.data)
      })

      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async getCurrencies(params: Partial<ICurrency> = {}) {
    try {
      const { data } = await repository.read(params)

      this.$patch(state => {
        state.currencies = data.data
      })

      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
