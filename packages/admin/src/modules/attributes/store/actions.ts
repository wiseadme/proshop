import { useAttributeRepository } from '@modules/attributes/repository/attribute.repository'
import { IAttribute } from '@ecommerce-platform/types/index'
import { IAttributeActions } from '@modules/attributes/types'

const repository = useAttributeRepository()

export const actions: IAttributeActions = {
  async create(attribute: IAttribute){
    try {
      const { data } = await repository.create(attribute)
      this.attributes.push(data.data)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async read(id?: string){
    try {
      const { data } = await repository.read(id)
      this.attributes = data.data.sort((a, b) => a.order - b.order)
      return this.attributes
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async update(updates: Array<IAttribute>){
    try {
      const { data } = await repository.update(updates)
      const map: { [key: string]: IAttribute } = {}

      this.attributes.concat(data.data).forEach(it => map[it._id] = it)

      this.attributes = Object.values(map).sort(
        (a, b) => a.order - b.order
      )

      return this.attributes
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async delete(id: string){
    try {
      const { data } = await repository.delete(id)
      this.attributes = this.attributes.filter(it => it._id !== id)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
