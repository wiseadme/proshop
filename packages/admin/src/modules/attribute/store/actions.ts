import { useAttributeRepository } from '@modules/attribute/repository/attribute.repository'
import { IAttribute } from '@ecommerce-platform/types'
import { IAttributeActions } from '@modules/attribute/types'

const repository = useAttributeRepository()

export const actions: IAttributeActions = {
  async create(attribute: IAttribute) {
    try {
      const { data } = await repository.create(attribute)
      this.attributes.push(data.data)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async read(id?: string) {
    try {
      const { data } = await repository.read(id)

      this.$patch(state => {
        state.attributes = data?.data
      })

      return this.attributes
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async update(updates: Array<IAttribute>) {
    try {
      const { data } = await repository.update(updates)

      this.$patch(state => {
        state.attributes = data.data
      })

      return this.attributes
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async delete(id: string) {
    try {
      const { data } = await repository.delete(id)

      this.$patch(state => {
        state.attributes = state.attributes.filter(it => it._id !== id)
      })

      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
