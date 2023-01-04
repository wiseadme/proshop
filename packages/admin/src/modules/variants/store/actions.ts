import { useVariantRepository } from '../repository/variant.repository'
import { IVariant } from '@ecommerce-platform/types/index'
import { IVariantActions } from '@modules/variants/types'

const repository = useVariantRepository()

export const actions: IVariantActions = {
  async create(variant: IVariant): Promise<IVariant>{
    try {
      const { data } = await repository.create(variant)
      this.variants.push(data.data)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async read(id?: string): Promise<Array<IVariant>>{
    try {
      const { data } = await repository.read(id)

      this.$patch(state => {
        state.variants = data?.data
      })

      return data?.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async delete(id: string): Promise<boolean>{
    try {
      const { data } = await repository.delete(id)
      this.variants = this.variants.filter(it => it._id !== id)
      return data.data as boolean
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
