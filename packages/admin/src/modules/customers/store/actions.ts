import { useCustomersRepository } from '@modules/customers/repository/customers.repository'

const repository = useCustomersRepository()

export const actions = {
    async getCustomers(params = {}) {
        try {
            const { data } = await repository.read(params)

            this.$patch(state => {
                state.customers = data.data
            })

            return data.data
        } catch (err) {
            return Promise.reject()
        }
    }
}
