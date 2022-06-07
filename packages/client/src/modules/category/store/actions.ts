import { useCategoryRepository } from '@modules/category/repository/category.repository'

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

  async read(id?: string){
    try {
      const { data } = await categoryRepository.read(id)
      !id && (this.categories = data.data)
      id && (this.category = data.data)
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
