import {
    useAttributeRepository
} from '@modules/attributes/composables/repository/use-attribute-repository'

import { IAttribute } from '@proshop-app/types'

import { IAttributeActions } from '@modules/attributes/types'

const repository = useAttributeRepository()

export const actions: IAttributeActions = {
    async create(attribute: IAttribute) {
        try {
            const { data } = await repository.createAttribute(attribute)
            this.attributes.push(data)
            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async read(id?: string) {
        try {
            const { data } = await repository.getAttributes(id ? { id } : {})

            this.$patch(state => {
                state.attributes = data
            })

            return this.attributes
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async update(updates: IAttribute[]) {
        try {
            const { data } = await repository.updateAttribute(updates)

            this.$patch(state => {
                state.attributes = data
            })

            return this.attributes
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async delete(id: string) {
        try {
            const { data } = await repository.deleteAttribute(id)

            this.$patch(state => {
                state.attributes = state.attributes.filter(it => it.id !== id)
            })

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
