import { IOption } from '@proshop/types'

import { useOptionsRepository } from '@shared/repository/options.repository'

const repository = useOptionsRepository()

export const actions = {
    async createOption(option: IOption): Promise<IOption> {
        try {
            const { data } = await repository.create(option)
            return data.data
        } catch (error) {
            return Promise.reject(error)
        }
    },

    async updateOption(updates: Partial<IOption>) {
        try {
            const { data } = await repository.update(updates)
            return data.data
        } catch (error) {
            return Promise.reject(error)
        }
    },

    async deleteOption(id: string) {
        try {
            await repository.delete(id)
            return true
        } catch (error) {
            return Promise.reject(error)
        }
    },
}
