import { useOptionsRepository } from '@shared/repository/options.repository'
import { IOption } from '@ecommerce-platform/server/src/modules/option/types/model'

const repository = useOptionsRepository()

export const actions = {
  async createOption(option): Promise<IOption>{
    try {
      const { data } = await repository.create(option)
      return data.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
