import { useProductRepository } from '@modules/product/repository'
import { IProductActions } from '../types'
import { IProduct } from '@ecommerce-platform/types/index'

const productRepository = useProductRepository()

export const actions: IProductActions = {
  async create(product: IProduct){
    try {
      const response = await productRepository.create(product)
      this.products.push(response.data.data)
      return response?.data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async read(id?: string){
    try {
      const { data } = await productRepository.read(id)

      if (!id) {
        this.$patch(state => {
          state.products = data.data
        })
      }

      return data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async update(updates){
    try {
      const response = await productRepository.update(updates)

      this.products = Array.from(this.products, (pr: IProduct) => {
        if (pr._id === updates._id) {
          return response?.data.data
        }

        return pr
      })

      return response?.data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async delete(product: IProduct){
    try {
      const response = await productRepository.delete(product._id)
      this.products = this.products.filter(it => it._id !== product._id)
      return response?.data
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
