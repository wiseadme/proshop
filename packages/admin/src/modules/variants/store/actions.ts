import { IVariant } from '@proshop/types'

import { IVariantActions } from '@modules/variants/types'

import { useVariantRepository } from '../repository/variant.repository'

const repository = useVariantRepository()

export const actions: IVariantActions = {
    async create(variant: IVariant): Promise<IVariant> {
        try {
            const { data } = await repository.create(variant)
            this.variants.push(data.data)
            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },


    async update(updates: Partial<IVariant>): Promise<IVariant> {
        try {
            const { data } = await repository.update(updates)

            this.variants = this.variants.map(v => {
                if (v.id === data.data.id) return data.data

                return v
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async read(params: Partial<IVariant> = {}): Promise<Array<IVariant>> {
        try {
            const { data } = await repository.read(params)

            this.$patch(state => {
                state.variants = data?.data
            })

            return data?.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async delete(id: string): Promise<boolean> {
        try {
            const { data } = await repository.delete(id)

            this.$patch(state => {
                state.variants = state.variants.filter(it => it.id !== id)
            })

            return data.data as boolean
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
