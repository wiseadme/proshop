import { IMerchant } from '@ecommerce-platform/types'
import { useMerchantRepository } from '@modules/settings/repository/merchant.repository'

const repository = useMerchantRepository()
export const actions = {
    async createMerchant(merchant: IMerchant) {
        try {
            const { data } = await repository.create(merchant)

            this.$patch(state => {
                state.merchant = data.data
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async getMerchant() {
        try {
            const { data } = await repository.read()

            this.$patch(state => state.merchant = data.data)

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async updateMerchant(updates: Partial<IMerchant>) {
        try {
            const { data } = await repository.update(updates)

            this.$patch(state => state.merchant = data.data)

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
