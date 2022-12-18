import { useCategoryRepository } from '@modules/category/repository/category.repository'
import { ICategory } from '@ecommerce-platform/types'

const categoryRepository = useCategoryRepository()

export const actions = {
  async create(category: ICategory){
    try {
      const { data } = await categoryRepository.create(category)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async update(updates){
    try {
      const { data } = await categoryRepository.update(updates)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async read(params = null){
    try {
      const { data } = await categoryRepository.read(params)
      !params && (this.categories = data.data)
      params && (this.category = data.data)
      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async delete(category){
    try {
      const { data } = await categoryRepository.delete(category._id)
      return data
    } catch (err) {
      return Promise.reject(err)
    }
  },
}
