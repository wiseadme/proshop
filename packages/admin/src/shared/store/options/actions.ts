import { useOptionsRepository } from '@shared/repository/options.repository'
import { IVariantOption } from '@modules/variants/types'

const repository = useOptionsRepository()

export const actions = {
    async createOption(option): Promise<IVariantOption>{
        try {
            const { data } = await repository.create(option)
            return data.data
        } catch (error) {
            return Promise.reject(error)
        }
    },

    async updateOption(updates){
        try {
            const { data } = await repository.update(updates)
            return data.data
        } catch (error) {
            return Promise.reject(error)
        }
    },

    async deleteOption(id){
        try {
            await repository.delete(id)
            return true
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
