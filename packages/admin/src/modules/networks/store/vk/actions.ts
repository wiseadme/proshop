import { useVKRepository } from '@modules/networks/repository/vk.repository'

const repository = useVKRepository()
export const actions = {
    async getVKAccessToken(params) {
        try {
            const { data } = await repository.getToken(params)

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },
}
