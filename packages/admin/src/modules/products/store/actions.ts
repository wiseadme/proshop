import { useProductRepository } from '@modules/products/repository'
import { IProduct, IRequestPagination } from '@ecommerce-platform/types'
import { IProductActions } from '../types'
import { IRequestSort } from '@ecommerce-platform/types/request'

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

  async read(params: IRequestPagination & Partial<IRequestSort> & Partial<IProduct>){
    try {
      const { data } = await productRepository.read(params)

      this.$patch(state => {
        state.products = data.data?.items
        state.totalLength = data.data?.total
      })

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